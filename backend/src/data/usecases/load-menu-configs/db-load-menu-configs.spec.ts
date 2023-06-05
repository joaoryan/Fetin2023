/* eslint-disable no-undef */
import { DbLoadCompanyMenuConfigs } from './db-load-menu-configs'
import { MenuConfigsModel, LoadCompanyMenuCofigRepository } from './db-load-menu-configs-protocols'
import { mockInsertMenuConfig, mockReturnMenuConfig } from '../../../domain/mocks/menus'

const makeLoadCompanyMenuCofigRepository = (): LoadCompanyMenuCofigRepository => {
  class LoadCompanyMenuCofigRepositoryStub implements LoadCompanyMenuCofigRepository {
    async loadMenuConfig (idMenu: number): Promise<MenuConfigsModel> {
      return new Promise(resolve => resolve(mockReturnMenuConfig()))
    }
  }
  return new LoadCompanyMenuCofigRepositoryStub()
}

interface SutTypes {
  sut: DbLoadCompanyMenuConfigs
  loadCompanyMenuCofigRepositoryStub: LoadCompanyMenuCofigRepository
}

const makeSut = (): SutTypes => {
  const loadCompanyMenuCofigRepositoryStub = makeLoadCompanyMenuCofigRepository()
  const sut = new DbLoadCompanyMenuConfigs(loadCompanyMenuCofigRepositoryStub)
  return {
    sut,
    loadCompanyMenuCofigRepositoryStub
  }
}

describe('DbLoadCompanyMenuConfigs Usecase', () => {
  test('Should call loadUserMenuCofigRepository with correct values', async () => {
    const { sut, loadCompanyMenuCofigRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadCompanyMenuCofigRepositoryStub, 'loadMenuConfig')
    const menuConfigResult = await mockInsertMenuConfig()
    await sut.loadMenuConfigs(menuConfigResult.idMenu)
    expect(addSpy).toHaveBeenCalledWith(menuConfigResult.idMenu)
  })

  test('Should throw if loadCompanyMenuCofigRepository thows', async () => {
    const { sut, loadCompanyMenuCofigRepositoryStub } = makeSut()
    jest.spyOn(loadCompanyMenuCofigRepositoryStub, 'loadMenuConfig').mockRejectedValue(new Error())
    const promise = sut.loadMenuConfigs(1)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a company on loadCompanyMenuCofigRepository success', async () => {
    const menuConfigResult = await mockInsertMenuConfig()
    const { sut } = makeSut()
    const result = await sut.loadMenuConfigs(menuConfigResult.idMenu)
    expect(result).toEqual(mockReturnMenuConfig())
  })
})
