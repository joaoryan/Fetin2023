/* eslint-disable no-undef */
import { mockAddMenu, mockMenuModel } from '../../../domain/mocks/menus'
import { MenuModel } from '../../../domain/models/menu'
import { AddMenuModel } from '../../../domain/usecases/add-menu'
import { AddMenuRepository } from '../../protocols/db/menu/add-menu-repository'
import { DbAddMenu } from './db-add-menu'

const makeAddMenuRepository = (): AddMenuRepository => {
  class AddMenuRepositoryStub implements AddMenuRepository {
    async add (menuData: AddMenuModel): Promise<MenuModel> {
      return new Promise(resolve => resolve(mockMenuModel(menuData.companyId)))
    }
  }
  return new AddMenuRepositoryStub()
}

interface SutTypes {
  sut: DbAddMenu
  addMenuRepositoryStub: AddMenuRepository
}

const makeSut = (): SutTypes => {
  const addMenuRepositoryStub = makeAddMenuRepository()
  const sut = new DbAddMenu(addMenuRepositoryStub)
  return {
    sut,
    addMenuRepositoryStub
  }
}

describe('DbAddMenu Usecase', () => {
  test('Should call AddMenuRepository with correct values', async () => {
    const { sut, addMenuRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMenuRepositoryStub, 'add')
    const menuResult = await mockAddMenu()
    await sut.add(menuResult)
    expect(addSpy).toHaveBeenCalledWith(menuResult)
  })

  test('Should throw if AddMenuRepository thows', async () => {
    const { sut, addMenuRepositoryStub } = makeSut()
    jest.spyOn(addMenuRepositoryStub, 'add').mockRejectedValue(new Error())
    const menuResult = await mockAddMenu()
    const promise = sut.add(menuResult)
    await expect(promise).rejects.toThrow()
  })
})
