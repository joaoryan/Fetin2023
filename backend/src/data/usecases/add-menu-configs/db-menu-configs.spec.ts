/* eslint-disable no-undef */
import { mockAddMenuConfig, mockMenuConfigModel } from '../../../domain/mocks/menus'
import { AddMenuConfigsModel } from '../../../domain/usecases/add-menu-configs'
import { AddMenuConfigsRepository } from '../../protocols/db/menu/add-menu-configs-repository'
import { MenuConfigsModel } from '../load-menu-configs/db-load-menu-configs-protocols'
import { DbAddMenuConfigs } from './db-menu-configs'

const makeAddMenuRepository = (): AddMenuConfigsRepository => {
  class AddMenuConfigsRepositoryStub implements AddMenuConfigsRepository {
    addConfig (menuData: AddMenuConfigsModel): Promise<MenuConfigsModel> {
      return new Promise(resolve => resolve(mockMenuConfigModel(menuData.menuId)))
    }
  }
  return new AddMenuConfigsRepositoryStub()
}

interface SutTypes {
  sut: DbAddMenuConfigs
  addMenuConfigRepositoryStub: AddMenuConfigsRepository
}

const makeSut = (): SutTypes => {
  const addMenuConfigRepositoryStub = makeAddMenuRepository()
  const sut = new DbAddMenuConfigs(addMenuConfigRepositoryStub)
  return {
    sut,
    addMenuConfigRepositoryStub
  }
}

describe('DbAddMenuConfigs Usecase', () => {
  test('Should call AddMenuConfigsRepository with correct values', async () => {
    const { sut, addMenuConfigRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMenuConfigRepositoryStub, 'addConfig')
    const menuConfigResult = await mockAddMenuConfig()
    await sut.addConfigs(menuConfigResult)
    expect(addSpy).toHaveBeenCalledWith(menuConfigResult)
  })

  test('Should throw if AddMenuConfigsRepository thows', async () => {
    const { sut, addMenuConfigRepositoryStub } = makeSut()
    jest.spyOn(addMenuConfigRepositoryStub, 'addConfig').mockRejectedValue(new Error())
    const menuConfigResult = await mockAddMenuConfig()
    const promise = sut.addConfigs(menuConfigResult)
    await expect(promise).rejects.toThrow()
  })
})
