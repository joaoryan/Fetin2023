/* eslint-disable no-undef */
import { DeleteGroupRepository } from './db-delete-group-protocols'
import { DbDeleteGroup } from './db-delete-group'
import { mockInsertGroup } from '../../../domain/mocks/menus'

const makeDeleteGroupRepository = (): DeleteGroupRepository => {
  class DeleteGroupRepositoryStub implements DeleteGroupRepository {
    async deleteGroup (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteGroupRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteGroup
  deleteGroupRepositoryStub: DeleteGroupRepository
}

const makeSut = (): SutTypes => {
  const deleteGroupRepositoryStub = makeDeleteGroupRepository()
  const sut = new DbDeleteGroup(deleteGroupRepositoryStub)
  return {
    sut,
    deleteGroupRepositoryStub
  }
}

describe('DbDeleteGroup Usecase', () => {
  test('Should call deleteGroupRepository with correct values', async () => {
    const { sut, deleteGroupRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteGroupRepositoryStub, 'deleteGroup')
    const groupResult = await mockInsertGroup()
    await sut.deleteGroup(groupResult.idGroup)
    expect(deleteSpy).toHaveBeenCalledWith(groupResult.idGroup)
  })

  test('Should throw if deleteGroupRepository thows', async () => {
    const { sut, deleteGroupRepositoryStub } = makeSut()
    jest.spyOn(deleteGroupRepositoryStub, 'deleteGroup').mockRejectedValue(new Error())
    const promise = sut.deleteGroup(1)
    await expect(promise).rejects.toThrow()
  })
})
