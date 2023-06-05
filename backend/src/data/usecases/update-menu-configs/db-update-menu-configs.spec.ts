/* eslint-disable no-undef */
import { UpdateMenuConfigsModel, UpdateMenuConfigsRepository } from './db-update-menu-configs-protocols'
import { DbUpdateMenuConfigs } from './db-update-menu-cofigs'
import { mockUpdateMenuConfig } from '../../../domain/mocks/menus'

const makeUpdateMenuConfigsRepository = (): UpdateMenuConfigsRepository => {
  class UpdateMenuConfigsRepositoryStub implements UpdateMenuConfigsRepository {
    updateMenuConfigs (menuConfigsData: UpdateMenuConfigsModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateMenuConfigsRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateMenuConfigs
  addMenuConfigsRepositoryStub: UpdateMenuConfigsRepository
}

const makeSut = (): SutTypes => {
  const addMenuConfigsRepositoryStub = makeUpdateMenuConfigsRepository()
  const sut = new DbUpdateMenuConfigs(addMenuConfigsRepositoryStub)
  return {
    sut,
    addMenuConfigsRepositoryStub
  }
}

describe('DbUpdateMenuConfigs Usecase', () => {
  test('Should call UpdateMenuConfigsRepository with correct values', async () => {
    const { sut, addMenuConfigsRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMenuConfigsRepositoryStub, 'updateMenuConfigs')
    const menuConfigResult = await mockUpdateMenuConfig()
    await sut.updateMenuConfigs(menuConfigResult)
    expect(addSpy).toHaveBeenCalledWith(menuConfigResult)
  })

  test('Should throw if UpdateMenuConfigsRepository thows', async () => {
    const { sut, addMenuConfigsRepositoryStub } = makeSut()
    jest.spyOn(addMenuConfigsRepositoryStub, 'updateMenuConfigs').mockRejectedValue(new Error())
    const menuConfigResult = await mockUpdateMenuConfig()
    const promise = sut.updateMenuConfigs(menuConfigResult)
    await expect(promise).rejects.toThrow()
  })
})
