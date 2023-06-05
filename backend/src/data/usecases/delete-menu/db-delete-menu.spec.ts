/* eslint-disable no-undef */
import { DeleteMenuRepository } from './db-delete-menu-protocols'
import { DbDeleteMenu } from './db-delete-menu'
import { mockInsertMenu } from '../../../domain/mocks/menus'

const makeDeleteMenuRepository = (): DeleteMenuRepository => {
  class DeleteMenuRepositoryStub implements DeleteMenuRepository {
    deleteMenu (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteMenuRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteMenu
  deleteMenuRepositoryStub: DeleteMenuRepository
}

const makeSut = (): SutTypes => {
  const deleteMenuRepositoryStub = makeDeleteMenuRepository()

  const sut = new DbDeleteMenu(deleteMenuRepositoryStub)
  return {
    sut,
    deleteMenuRepositoryStub
  }
}

describe('DbDeleteMenu Usecase', () => {
  test('Should call deleteMenuRepository with correct values', async () => {
    const { sut, deleteMenuRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteMenuRepositoryStub, 'deleteMenu')
    const menuResult = await mockInsertMenu()
    await sut.deleteMenu(menuResult.idMenu)
    expect(deleteSpy).toHaveBeenCalledWith(menuResult.idMenu)
  })

  test('Should throw if deleteMenuRepository thows', async () => {
    const { sut, deleteMenuRepositoryStub } = makeSut()
    jest.spyOn(deleteMenuRepositoryStub, 'deleteMenu').mockRejectedValue(new Error())
    const promise = sut.deleteMenu(1)
    await expect(promise).rejects.toThrow()
  })
})
