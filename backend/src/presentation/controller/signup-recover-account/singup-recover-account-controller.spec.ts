/* eslint-disable no-undef */
import { SignUpController } from './singup-recover-account-controller'
import { EmailInUseError, MissingParamError, ServerError } from '../../errors'
import {
  AddUserModel,
  AddUser,
  UserModel,
  CompanyModel,
  Validation,
  AddCompany,
  AddCompanyModel,
  MailService,
  sendEmail,
  LoadEquipByPin,
  UpdateEquipByCompany
} from './signup-recover-account-controller-protocols'
import {
  ok,
  serverError,
  badRequest,
  forbidden
} from '../../helpers/http-helper'
import { CompanyExistsError } from '../../errors/company-already- exists-error'
import { EquipModel } from '../../../domain/models/equipment'
import { connection } from '../../../main/config/app'
import mysql from 'mysql'
import env from '../../../main/config/env'
import {
  AddConfigs,
  AddConfigsModel
} from '../../../domain/usecases/add-configs'
import { ConfigsModel } from '../../../domain/models/configs'
import { mockAddEquipmentResponse, mockInsertEquip } from '../../../domain/mocks/equipment'
import { makeFakeRequestUserAdm, mockCompanyModel, mockReturnCompany, mockReturnUser, mockReturnUserConfigs, mockUserConfigsModel } from '../../../domain/mocks/user'

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add(user: AddUserModel): Promise<UserModel> {
      return new Promise((resolve) => resolve(mockReturnUser()))
    }
  }
  return new AddUserStub()
}

const makeAddCompany = (): AddCompany => {
  class AddCompanyStub implements AddCompany {
    async add(user: AddCompanyModel): Promise<CompanyModel> {
      return new Promise((resolve) => resolve(mockReturnCompany()))
    }
  }
  return new AddCompanyStub()
}

const makeLoadEquipByPin = (): LoadEquipByPin => {
  class LoadEquipByPinStub implements LoadEquipByPin {
    load(IOKPin: String): Promise<EquipModel> {
      return new Promise((resolve) => resolve(mockAddEquipmentResponse()))
    }
  }
  return new LoadEquipByPinStub()
}

const makeUpdateEquipByCompany = (): UpdateEquipByCompany => {
  class UpdateEquipByCompanyStub implements UpdateEquipByCompany {
    update(idEquip: number, idCompany: number): Promise<void> {
      return new Promise((resolve) => resolve())
    }
  }
  return new UpdateEquipByCompanyStub()
}

const makeAddConfigs = (): AddConfigs => {
  class AddConfigsStub implements AddConfigs {
    async add(configs: AddConfigsModel): Promise<ConfigsModel> {
      return new Promise((resolve) => resolve(mockReturnUserConfigs()))
    }
  }

  return new AddConfigsStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: SignUpController;
  addUserStub: AddUser;
  addCompanyStub: AddCompany;
  userValidationStub: Validation;
  companyValidationStub: Validation;
  mailService: sendEmail;
  loadEquipByPinStub: LoadEquipByPin;
  updateEquipByCompanyStub: UpdateEquipByCompany;
  addConfigsStub: AddConfigs;
}

const makeSut = (): SutTypes => {
  const addUserStub = makeAddUser()
  const userValidationStub = makeValidation()
  const addCompanyStub = makeAddCompany()
  const companyValidationStub = makeValidation()
  const mailService = new MailService()
  const loadEquipByPinStub = makeLoadEquipByPin()
  const updateEquipByCompanyStub = makeUpdateEquipByCompany()
  const addConfigsStub = makeAddConfigs()
  const sut = new SignUpController(
    addUserStub,
    addCompanyStub,
    addConfigsStub,
    userValidationStub,
    companyValidationStub,
    mailService,
    loadEquipByPinStub,
    updateEquipByCompanyStub
  )
  return {
    sut,
    addUserStub,
    addCompanyStub,
    userValidationStub,
    companyValidationStub,
    mailService,
    loadEquipByPinStub,
    updateEquipByCompanyStub,
    addConfigsStub
  }
}

describe('SingUp Controller', () => {
  beforeAll(() => jest.setTimeout(30 * 1000))

  afterAll(async () => {
    connection.end()
    testConnection.end()
    jest.setTimeout(5 * 1000)
  })

  const testConnection = mysql.createPool(env.dbTest)

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(await makeFakeRequestUserAdm())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call UserValidation with correct values', async () => {
    const { sut, userValidationStub } = makeSut()
    const userValidateSpy = jest.spyOn(userValidationStub, 'validate')
    const httpRequest = await makeFakeRequestUserAdm()
    await sut.handle(httpRequest)
    expect(userValidateSpy).toHaveBeenCalledWith(httpRequest.body.user)
  })

  test('Should return 400 if UserValidation returns an error', async () => {
    const { sut, userValidationStub } = makeSut()
    jest
      .spyOn(userValidationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(await makeFakeRequestUserAdm())
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    )
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addUserStub } = makeSut()
    jest
      .spyOn(addUserStub, 'add')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle(await makeFakeRequestUserAdm())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should call AddCompany with correct values', async () => {
    const { sut, addCompanyStub } = makeSut()
    const addSpy = jest.spyOn(addCompanyStub, 'add')
    const httpRequest = await makeFakeRequestUserAdm()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(mockCompanyModel())
  })

  test('Should return 500 if AddCompany throws', async () => {
    const { sut, addCompanyStub } = makeSut()
    jest.spyOn(addCompanyStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(await makeFakeRequestUserAdm())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call CompanyValidation with correct values', async () => {
    const { sut, companyValidationStub } = makeSut()
    const userValidateSpy = jest.spyOn(companyValidationStub, 'validate')
    const httpRequest = await makeFakeRequestUserAdm()
    await sut.handle(httpRequest)
    expect(userValidateSpy).toHaveBeenCalledWith(httpRequest.body.company)
  })

  test('Should return 400 if CompanyValidation returns an error', async () => {
    const { sut, userValidationStub } = makeSut()
    jest
      .spyOn(userValidationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(await makeFakeRequestUserAdm())
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    )
  })

  test('Should return 403 if AddCompany returns null', async () => {
    const { sut, addCompanyStub } = makeSut()
    jest
      .spyOn(addCompanyStub, 'add')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle(await makeFakeRequestUserAdm())
    expect(httpResponse).toEqual(forbidden(new CompanyExistsError()))
  })

  test('Should call AddConfigs with correct values', async () => {
    const { sut, addConfigsStub } = makeSut()
    const addSpy = jest.spyOn(addConfigsStub, 'add')
    const response = await sut.handle(await makeFakeRequestUserAdm())
    expect(addSpy).toHaveBeenCalledWith(mockUserConfigsModel(response.body.user.id))
  })

  test('Should return 500 if AddConfigs throws', async () => {
    const { sut, addConfigsStub } = makeSut()
    jest.spyOn(addConfigsStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(await makeFakeRequestUserAdm())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    await mockInsertEquip()
    const { sut } = makeSut()
    const httpResponse = await sut.handle(await makeFakeRequestUserAdm())
    expect(httpResponse).toEqual(
      ok({
        user: mockReturnUser(),
        company: mockReturnCompany(),
        configs: mockReturnUserConfigs()
      })
    )
  })
})
