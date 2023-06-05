/* eslint-disable no-undef */
import { mockUpdateGroup, mockReturnGroup } from '../../../domain/mocks/menus'
import { UpdateGroupModel, MenuGroupModel, UpdateGroupRepository } from './db-update-group-protocols'
import { DbUpdateGroup } from './db-update-group'

const makeUpdateGroupRepository = (): UpdateGroupRepository => {
  class UpdateGroupRepositoryStub implements UpdateGroupRepository {
    async updateGroup (groupData: UpdateGroupModel): Promise<MenuGroupModel> {
      return new Promise(resolve => resolve(mockReturnGroup()))
    }
  }
  return new UpdateGroupRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateGroup
  UpdateGroupRepositoryStub: UpdateGroupRepository
}

const makeSut = (): SutTypes => {
  const UpdateGroupRepositoryStub = makeUpdateGroupRepository()
  const sut = new DbUpdateGroup(UpdateGroupRepositoryStub)
  return {
    sut,
    UpdateGroupRepositoryStub
  }
}

describe('DbUpdateGroup Usecase', () => {
  test('Should call UpdateGroupRepository with correct values', async () => {
    const { sut, UpdateGroupRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(UpdateGroupRepositoryStub, 'updateGroup')
    const groupResult = await mockUpdateGroup()
    await sut.updateGroup(groupResult)
    expect(addSpy).toHaveBeenCalledWith(groupResult)
  })

  test('Should throw if UpdateGroupRepository thows', async () => {
    const { sut, UpdateGroupRepositoryStub } = makeSut()
    jest.spyOn(UpdateGroupRepositoryStub, 'updateGroup').mockRejectedValue(new Error())
    const groupResult = await mockUpdateGroup()
    const promise = sut.updateGroup(groupResult)
    await expect(promise).rejects.toThrow()
  })
})
