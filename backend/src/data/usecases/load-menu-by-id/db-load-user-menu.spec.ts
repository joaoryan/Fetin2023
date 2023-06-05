/* eslint-disable no-undef */
import { mockInsertMenu, mockReturnMenu } from '../../../domain/mocks/menus'
import { DbLoadMenu } from './db-load-menu'
import { LoadMenuById, MenuModel, LoadMenuRepository } from './db-load-user-menu-protocols'

const makeLoadMenuRepository = (): LoadMenuRepository => {
  class LoadMenuRepositoryStub implements LoadMenuRepository {
    loadMenuById (id: number): Promise<MenuModel> {
      return new Promise(resolve => resolve(mockReturnMenu()))
    }
  }
  return new LoadMenuRepositoryStub()
}

interface SutTypes {
  sut: LoadMenuById
  loadMenuRepositoryStub: LoadMenuRepository
}

const makeSut = (): SutTypes => {
  const loadMenuRepositoryStub = makeLoadMenuRepository()
  const sut = new DbLoadMenu(loadMenuRepositoryStub)
  return {
    sut,
    loadMenuRepositoryStub
  }
}

describe('DbLoadMenu Usecase', () => {
  test('Should call LoadMenuRepository with correct values', async () => {
    const { sut, loadMenuRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadMenuRepositoryStub, 'loadMenuById')
    const menuResult = await mockInsertMenu()
    await sut.loadMenu(menuResult.idMenu)
    expect(addSpy).toHaveBeenCalledWith(menuResult.idMenu)
  })

  test('Should throw if LoadMenuRepository thows', async () => {
    const { sut, loadMenuRepositoryStub } = makeSut()
    jest.spyOn(loadMenuRepositoryStub, 'loadMenuById').mockRejectedValue(new Error())
    const promise = sut.loadMenu(1)
    await expect(promise).rejects.toThrow()
  })
})
