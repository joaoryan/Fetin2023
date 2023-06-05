/* eslint-disable no-undef */
import { mockUpdateCookbook } from '../../../domain/mocks/cookbook'
import { DbUpdateCookbook } from './db-update-cookbook'
import { UpdateCookbookRepository } from '../../protocols/db/cookbook/update-cookbook-repository'
import { UpdateCookbookModel } from '../../../domain/usecases/update-cookbook'

const makeUpdateCookbookRepository = (): UpdateCookbookRepository => {
  class UpdateCookbookRepositoryStub implements UpdateCookbookRepository {
    async updateCookbook (id: number, cookbook: UpdateCookbookModel): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new UpdateCookbookRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateCookbook
  updateCookbookRepositoryStub: UpdateCookbookRepository
}

const makeSut = (): SutTypes => {
  const updateCookbookRepositoryStub = makeUpdateCookbookRepository()
  const sut = new DbUpdateCookbook(updateCookbookRepositoryStub)
  return {
    sut,
    updateCookbookRepositoryStub
  }
}

describe('DbUpdateCookbook Usecase', () => {
  test('Should call UpdateCookbookRepository with correct values', async () => {
    const { sut, updateCookbookRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(updateCookbookRepositoryStub, 'updateCookbook')
    const cookbookResult = await mockUpdateCookbook()
    await sut.update(cookbookResult.id, cookbookResult)
    expect(addSpy).toHaveBeenCalledWith(cookbookResult.id, cookbookResult)
  })

  test('Should throw if UpdateCookbookRepository thows', async () => {
    const { sut, updateCookbookRepositoryStub } = makeSut()
    jest.spyOn(updateCookbookRepositoryStub, 'updateCookbook').mockRejectedValue(new Error())
    const cookbookResult = await mockUpdateCookbook()
    const promise = sut.update(cookbookResult.id, cookbookResult)
    await expect(promise).rejects.toThrow()
  })
})
