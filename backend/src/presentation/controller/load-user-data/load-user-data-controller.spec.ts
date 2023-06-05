/* eslint-disable no-undef */
import { LoadUserDataController } from './load-user-data-controller'
import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { LoadCompanyById } from '../../../domain/usecases/load-company-by-id'
import { CompanyModel, UserModel } from '../signup/signup-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { CompanyNotFoundError, ConfigsNotFoundError, UserNotFoundError } from '../../errors'
import { ConfigsModel } from '../../../domain/models/configs'
import { LoadConfigsByUserId } from '../../../domain/usecases/load-configs-by-user-id'
import { makeFakeRequestGetUser, mockReturnCompany, mockReturnUser, mockReturnUserConfigs } from '../../../domain/mocks/user'

const makeLoadUserById = (): LoadUserById => {
  class LoadUserByIdStub implements LoadUserById {
    load (id: number): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new LoadUserByIdStub()
}

const makeLoadCompanyById = (): LoadCompanyById => {
  class LoadCompanyByIdStub implements LoadCompanyById {
    load (id: number): Promise<CompanyModel | null> {
      return new Promise(resolve => resolve(mockReturnCompany()))
    }
  }
  return new LoadCompanyByIdStub()
}

const makeLoadConfigsByUserId = (): LoadConfigsByUserId => {
  class LoadConfigsByUserIdStub implements LoadConfigsByUserId {
    load (userId: number): Promise<ConfigsModel> {
      return new Promise(resolve => resolve(mockReturnUserConfigs()))
    }
  }
  return new LoadConfigsByUserIdStub()
}

interface SutTypes {
  sut: LoadUserDataController
  loadUserByIdStub: LoadUserById
  loadCompanyByIdStub: LoadCompanyById
  loadConfigsByUserIdStub: LoadConfigsByUserId
}

const makeSut = (): SutTypes => {
  const loadUserByIdStub = makeLoadUserById()
  const loadCompanyByIdStub = makeLoadCompanyById()
  const loadConfigsByUserIdStub = makeLoadConfigsByUserId()
  const sut = new LoadUserDataController(loadUserByIdStub, loadCompanyByIdStub, loadConfigsByUserIdStub)
  return {
    sut,
    loadUserByIdStub,
    loadCompanyByIdStub,
    loadConfigsByUserIdStub
  }
}

describe('Get user', () => {
  describe('LoadUserById', () => {
    test('Should call LoadUserById with correct values', async () => {
      const { sut, loadUserByIdStub } = makeSut()
      const loadSpy = jest.spyOn(loadUserByIdStub, 'load')
      await sut.handle(await makeFakeRequestGetUser())
      expect(loadSpy).toHaveBeenCalledWith(1)
    })

    test('Should return 500 if LoadUserById throws', async () => {
      const { sut, loadUserByIdStub } = makeSut()
      jest.spyOn(loadUserByIdStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const httpResponse = await sut.handle(await makeFakeRequestGetUser())
      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 400 if LoadUserById returns null', async () => {
      const { sut, loadUserByIdStub } = makeSut()
      jest.spyOn(loadUserByIdStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))
      const httpResponse = await sut.handle(await makeFakeRequestGetUser())
      expect(httpResponse).toEqual(badRequest(new UserNotFoundError()))
    })
  })

  describe('LoadCompanyById', () => {
    test('Should call LoadCompanyById with correct values', async () => {
      const { sut, loadCompanyByIdStub } = makeSut()
      const loadSpy = jest.spyOn(loadCompanyByIdStub, 'load')
      await sut.handle(await makeFakeRequestGetUser())
      expect(loadSpy).toHaveBeenCalledWith(mockReturnUser().companyId)
    })

    test('Should return 500 if LoadCompanyById throws', async () => {
      const { sut, loadCompanyByIdStub } = makeSut()
      jest.spyOn(loadCompanyByIdStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const httpResponse = await sut.handle(await makeFakeRequestGetUser())
      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 400 if LoadCompanyById returns null', async () => {
      const { sut, loadCompanyByIdStub } = makeSut()
      jest.spyOn(loadCompanyByIdStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))
      const httpResponse = await sut.handle(await makeFakeRequestGetUser())
      expect(httpResponse).toEqual(badRequest(new CompanyNotFoundError()))
    })
  })

  describe('LoadConfigsByUserId', () => {
    test('Should call LoadConfigsByUserId with correct values', async () => {
      const { sut, loadConfigsByUserIdStub } = makeSut()
      const loadSpy = jest.spyOn(loadConfigsByUserIdStub, 'load')
      await sut.handle(await makeFakeRequestGetUser())
      expect(loadSpy).toHaveBeenCalledWith(mockReturnUser().companyId)
    })

    test('Should return 500 if LoadConfigsByUserId throws', async () => {
      const { sut, loadConfigsByUserIdStub } = makeSut()
      jest.spyOn(loadConfigsByUserIdStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const httpResponse = await sut.handle(await makeFakeRequestGetUser())
      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 400 if LoadConfigsByUserId returns null', async () => {
      const { sut, loadConfigsByUserIdStub } = makeSut()
      jest.spyOn(loadConfigsByUserIdStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))
      const httpResponse = await sut.handle(await makeFakeRequestGetUser())
      expect(httpResponse).toEqual(badRequest(new ConfigsNotFoundError()))
    })
  })

  test('Should return 200 if LoadUserByToken returns an user', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(await makeFakeRequestGetUser())
    expect(httpResponse).toEqual(ok({
      user: mockReturnUser(),
      company: mockReturnCompany(),
      configs: mockReturnUserConfigs()
    }))
  })
})
