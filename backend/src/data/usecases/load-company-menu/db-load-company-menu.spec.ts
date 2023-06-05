/* eslint-disable no-undef */
import { DbLoadCompanyMenu } from './db-load-company-menu'
import { LoadCompanyMenu, MenuModel, LoadCompanyMenuRepository } from './db-load-company-menu-protocols'

const makeFakeMenu = (): MenuModel[] => ([
  {
    id: 1,
    equipTypeId: 1,
    companyId: 1,
    menuName: 'valid_name',
    creationDate: 'valid_date',
    lastUpdate: 'valid_update',
    menuVersion: 1,
    deletionDate: 'valid_date',
    userId: 1,
    deletedBy: 'valid_name',
    language: 'valid_language'
  }
])

const makeLoadUserMenuRepository = (): LoadCompanyMenuRepository => {
  class LoadCompanyMenuRepositoryStub implements LoadCompanyMenuRepository {
    async loadMenu (idCompany: number): Promise<MenuModel[]> {
      return new Promise(resolve => resolve(makeFakeMenu()))
    }
  }
  return new LoadCompanyMenuRepositoryStub()
}

interface SutTypes {
  sut: LoadCompanyMenu
  loadCompanyMenuRepositoryStub: LoadCompanyMenuRepository
}

const makeSut = (): SutTypes => {
  const loadCompanyMenuRepositoryStub = makeLoadUserMenuRepository()
  const sut = new DbLoadCompanyMenu(loadCompanyMenuRepositoryStub)
  return {
    sut,
    loadCompanyMenuRepositoryStub
  }
}

describe('DbLoadCompanyMenu Usecase', () => {
  test('Should call LoadCompanyMenuRepository with correct values', async () => {
    const { sut, loadCompanyMenuRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCompanyMenuRepositoryStub, 'loadMenu')
    await sut.loadMenu(1)
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if LoadCompanyMenuRepository throws', async () => {
    const { sut, loadCompanyMenuRepositoryStub } = makeSut()
    jest.spyOn(loadCompanyMenuRepositoryStub, 'loadMenu').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadMenu(1)
    await expect(promise).rejects.toThrow()
  })
})
