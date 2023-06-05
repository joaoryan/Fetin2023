/* eslint-disable no-undef */
import { connection } from '../../../main/config/app'
import mysql from 'mysql'
import env from '../../../main/config/env'
import { Validation } from '../../protocols'
import { UpdateUserByActivationCode } from '../../../domain/usecases/update-user-by-activation-code'
import { ActivateUserController } from './activate-user-controller'
import { badRequest, noContent, serverError } from '../../helpers/http-helper'
import { mockActivateTokenRequest } from '../../../domain/mocks/user'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeUpdateActivationCode = (): UpdateUserByActivationCode => {
  class UpdateActivationCodeStub implements UpdateUserByActivationCode {
    async updateActivationCode (activateToken: String): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateActivationCodeStub()
}

interface SutTypes {
  sut: ActivateUserController
  validationStub: Validation
  UpdateActivationCodeStub: UpdateUserByActivationCode
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const UpdateActivationCodeStub = makeUpdateActivationCode()
  const sut = new ActivateUserController(validationStub, UpdateActivationCodeStub)
  return {
    sut,
    validationStub,
    UpdateActivationCodeStub
  }
}

describe('ActivateUser Controller', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })
  const testConnection = mysql.createPool(env.dbTest)

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockActivateTokenRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should call UpdateActivationCodeStub with correct values', async () => {
    const { sut, UpdateActivationCodeStub } = makeSut()
    const addMenuSpy = jest.spyOn(UpdateActivationCodeStub, 'updateActivationCode')
    const httpRequest = mockActivateTokenRequest()
    const { activateToken } = httpRequest.body
    await sut.handle(mockActivateTokenRequest())
    expect(addMenuSpy).toHaveBeenCalledWith(activateToken)
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockActivateTokenRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockActivateTokenRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 500 AddMenu throws', async () => {
    const { sut, UpdateActivationCodeStub } = makeSut()
    jest.spyOn(UpdateActivationCodeStub, 'updateActivationCode').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockActivateTokenRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
