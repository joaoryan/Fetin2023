/* eslint-disable no-undef */
import { AddGroupModel, MenuGroupModel, AddGroupRepository } from './db-add-group-protocols'
import { DbAddGroup } from './db-add-group'
import { mockAddGroup, mockReturnGroup } from '../../../domain/mocks/menus'

const makeAddMenuRepository = (): AddGroupRepository => {
  class AddGroupRepositoryStub implements AddGroupRepository {
    async addGroup (groupData: AddGroupModel): Promise<MenuGroupModel> {
      return new Promise(resolve => resolve(mockReturnGroup()))
    }
  }

  return new AddGroupRepositoryStub()
}

interface SutTypes {
  sut: DbAddGroup
  addGroupRepositoryStub: AddGroupRepository
}

const makeSut = (): SutTypes => {
  const addGroupRepositoryStub = makeAddMenuRepository()
  const sut = new DbAddGroup(addGroupRepositoryStub)
  return {
    sut,
    addGroupRepositoryStub
  }
}

describe('DbAddGroup Usecase', () => {
  test('Should call AddGroupRepository with correct values', async () => {
    const { sut, addGroupRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addGroupRepositoryStub, 'addGroup')
    const groupResult = await mockAddGroup()
    await sut.addGroup(groupResult)
    expect(addSpy).toHaveBeenCalledWith(groupResult)
  })

  test('Should throw if AddGroupRepository thows', async () => {
    const { sut, addGroupRepositoryStub } = makeSut()
    jest.spyOn(addGroupRepositoryStub, 'addGroup').mockRejectedValue(new Error())
    const groupResult = await mockAddGroup()
    const promise = sut.addGroup(groupResult)
    await expect(promise).rejects.toThrow()
  })
})
