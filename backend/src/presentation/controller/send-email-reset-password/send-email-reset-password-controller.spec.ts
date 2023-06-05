/* eslint-disable no-undef */
import { MissingParamError, UserNotFoundError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { SendEmailResetPasswordController } from './send-email-reset-password-controller'
import { HttpRequest, sendEmail, Validation } from './send-email-reset-password-controller-protocols'
import { LoadUserByEmail } from '../../../domain/usecases/load-user-by-email'
import { UserModel } from '../../../domain/models/user'
import { MailService } from '../../../utils/send-email-adapter'
import { mockReturnUser } from '../../../domain/mocks/user'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadUserByEmail = (): LoadUserByEmail => {
  class LoadUserByEmailStub implements LoadUserByEmail {
    loadUser (email: string): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new LoadUserByEmailStub()
}

interface SutTypes {
  sut: SendEmailResetPasswordController,
  loadUserByEmailStub: LoadUserByEmail,
  mailService: sendEmail,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadUserByEmailStub = makeLoadUserByEmail()
  const mailService = new MailService()
  const validationStub = makeValidation()
  const sut = new SendEmailResetPasswordController(loadUserByEmailStub, validationStub, mailService)
  return {
    sut,
    loadUserByEmailStub,
    mailService,
    validationStub
  }
}

describe('SendEmailResetPassword Controller', () => {
  test('Should call loadUserByEmail with correct values', async () => {
    const { sut, loadUserByEmailStub } = makeSut()
    const authSpy = jest.spyOn(loadUserByEmailStub, 'loadUser')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, loadUserByEmailStub } = makeSut()
    jest.spyOn(loadUserByEmailStub, 'loadUser').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new UserNotFoundError()))
  })

  test('Should return 500 if loadUserByEmail throws', async () => {
    const { sut, loadUserByEmailStub } = makeSut()
    jest.spyOn(loadUserByEmailStub, 'loadUser').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({}))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
