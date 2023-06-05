/* eslint-disable no-undef */
import { mockInsertGroup, mockReturnGroup } from '../../../domain/mocks/menus'
import { DbLoadMenuGroup } from './db-load-menu-group'
import { LoadMenuGroup, MenuGroupModel, LoadMenuGroupRepository } from './db-load-menu-group-protocols'

const makeLoadMenuGroupRepository = (): LoadMenuGroupRepository => {
  class LoadMenuGroupRepositoryStub implements LoadMenuGroupRepository {
    async loadMenuGroup (idMenu: number): Promise<MenuGroupModel[]> {
      return new Promise(resolve => resolve([mockReturnGroup()]))
    }
  }
  return new LoadMenuGroupRepositoryStub()
}

interface SutTypes {
  sut: LoadMenuGroup
  loadMenuGroupRepositoryStub: LoadMenuGroupRepository
}

const makeSut = (): SutTypes => {
  const loadMenuGroupRepositoryStub = makeLoadMenuGroupRepository()
  const sut = new DbLoadMenuGroup(loadMenuGroupRepositoryStub)
  return {
    sut,
    loadMenuGroupRepositoryStub
  }
}

describe('DbLoadMenuGroup Usecase', () => {
  test('Should call LoadMenuGroupRepository with correct values', async () => {
    const { sut, loadMenuGroupRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadMenuGroupRepositoryStub, 'loadMenuGroup')
    const groupResult = await mockInsertGroup()
    await sut.loadMenuGroup(groupResult.idMenu)
    expect(addSpy).toHaveBeenCalledWith(groupResult.idMenu)
  })

  test('Should throw if LoadMenuGroupRepository thows', async () => {
    const { sut, loadMenuGroupRepositoryStub } = makeSut()
    jest.spyOn(loadMenuGroupRepositoryStub, 'loadMenuGroup').mockRejectedValue(new Error())
    const promise = sut.loadMenuGroup(1)
    await expect(promise).rejects.toThrow()
  })
})
