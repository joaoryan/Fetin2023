/* eslint-disable no-undef */
import { mockUpdateMenu } from '../../../domain/mocks/menus'
import { UpdateMenuModel } from '../../../domain/usecases/update-menu'
import { UpdateMenuRepository } from '../../protocols/db/menu/update-menu-repository'
import { DbUpdateMenu } from './db-update-menu'

const makeUpdateMenuRepository = (): UpdateMenuRepository => {
  class UpdateMenuRepositoryStub implements UpdateMenuRepository {
    async updateMenu (menuData: UpdateMenuModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateMenuRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateMenu
  UpdateMenuRepositoryStub: UpdateMenuRepository
}

const makeSut = (): SutTypes => {
  const UpdateMenuRepositoryStub = makeUpdateMenuRepository()
  const sut = new DbUpdateMenu(UpdateMenuRepositoryStub)
  return {
    sut,
    UpdateMenuRepositoryStub
  }
}

describe('DbUpdateMenu Usecase', () => {
  test('Should call UpdateMenuRepository with correct values', async () => {
    const { sut, UpdateMenuRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(UpdateMenuRepositoryStub, 'updateMenu')
    const menuResult = await mockUpdateMenu()
    await sut.updateMenu(menuResult)
    expect(addSpy).toHaveBeenCalledWith(menuResult)
  })

  test('Should throw if UpdateMenuRepository thows', async () => {
    const { sut, UpdateMenuRepositoryStub } = makeSut()
    jest.spyOn(UpdateMenuRepositoryStub, 'updateMenu').mockRejectedValue(new Error())
    const menuResult = await mockUpdateMenu()
    const promise = sut.updateMenu(menuResult)
    await expect(promise).rejects.toThrow()
  })
})
