/* eslint-disable no-undef */
import { AddUserController } from './add-user-controller'
import { EmailInUseError, MissingParamError, ServerError } from '../../errors'
import {
  AddUserModel,
  AddUser,
  UserModel,
  Validation,
  MailService,
  sendEmail
} from './add-user-controller-protocols'
import {
  ok,
  serverError,
  badRequest,
  forbidden
} from '../../helpers/http-helper'
import {
  AddConfigs,
  AddConfigsModel
} from '../../../domain/usecases/add-configs'
import { ConfigsModel } from '../../../domain/models/configs'
import { AddUserBelongStore, UserBelongStoreModel } from '../../../domain/usecases/add-userBelongStore'
import { makeFakeRequest, mockReturnUser, mockReturnUserConfigs, mockUserConfigsModel } from '../../../domain/mocks/user'

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (user: AddUserModel): Promise<UserModel> {
      return new Promise((resolve) => resolve(mockReturnUser()))
    }
  }
  return new AddUserStub()
}

const makeAddUserBelongStore = (): AddUserBelongStore => {
  class AddUserBelongStoreStub implements AddUserBelongStore {
    async addUserBelongStore (userRelation: UserBelongStoreModel): Promise<UserBelongStoreModel> {
      return new Promise((resolve) => resolve({ idUser: 1, idStore: 1 }))
    }
  }
  return new AddUserBelongStoreStub()
}

const makeAddConfigs = (): AddConfigs => {
  class AddConfigsStub implements AddConfigs {
    async add (configs: AddConfigsModel): Promise<ConfigsModel> {
      return new Promise((resolve) => resolve(mockReturnUserConfigs()))
    }
  }
  return new AddConfigsStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AddUserController;
  addUserStub: AddUser;
  userValidationStub: Validation;
  mailService: sendEmail;
  addConfigsStub: AddConfigs;
  addUserBelongStoreStub: AddUserBelongStore
}

const makeSut = (): SutTypes => {
  const addUserStub = makeAddUser()
  const userValidationStub = makeValidation()
  const mailService = new MailService()
  const addConfigsStub = makeAddConfigs()
  const addUserBelongStoreStub = makeAddUserBelongStore()
  const sut = new AddUserController(
    addUserStub,
    addConfigsStub,
    userValidationStub,
    mailService,
    addUserBelongStoreStub
  )
  return {
    sut,
    addUserStub,
    userValidationStub,
    mailService,
    addConfigsStub,
    addUserBelongStoreStub
  }
}

describe('AddUser Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = await makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call UserValidation with correct values', async () => {
    const { sut, userValidationStub } = makeSut()
    const userValidateSpy = jest.spyOn(userValidationStub, 'validate')
    const httpRequest = await makeFakeRequest()
    await sut.handle(httpRequest)
    expect(userValidateSpy).toHaveBeenCalledWith(httpRequest.body.user)
  })

  test('Should return 400 if UserValidation returns an error', async () => {
    const { sut, userValidationStub } = makeSut()
    jest
      .spyOn(userValidationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = await makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    )
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addUserStub } = makeSut()
    jest
      .spyOn(addUserStub, 'add')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpRequest = await makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should call AddConfigs with correct values', async () => {
    const { sut, addConfigsStub } = makeSut()
    const addSpy = jest.spyOn(addConfigsStub, 'add')
    const httpRequest = await makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(mockUserConfigsModel(1))
  })

  test('Should return 500 if AddConfigs throws', async () => {
    const { sut, addConfigsStub } = makeSut()
    jest.spyOn(addConfigsStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = await makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = await makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      ok({
        user: mockReturnUser(),
        configs: mockReturnUserConfigs()
      })
    )
  })
})
