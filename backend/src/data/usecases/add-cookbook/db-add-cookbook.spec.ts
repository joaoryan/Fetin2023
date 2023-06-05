/* eslint-disable no-undef */
import { DbAddCookbook } from './db-add-cookbook'
import { mockAddCookbook, mockReturnCookbook } from '../../../domain/mocks/cookbook'
import { AddCookbookRepository } from '../../protocols/db/cookbook/add-cookbook-repository'
import { AddCookbookModel } from '../../../domain/usecases/add-cookbook'
import { RecipeCookbookModel } from '../load-cookbook/db-load-cookbook-protocols'

const makeAddCookbookRepository = (): AddCookbookRepository => {
  class AddCookbookRepositoryStub implements AddCookbookRepository {
    async addCookbook (cookbook: AddCookbookModel): Promise<RecipeCookbookModel> {
      return new Promise(resolve => resolve(mockReturnCookbook()))
    }
  }

  return new AddCookbookRepositoryStub()
}

interface SutTypes {
  sut: DbAddCookbook
  addCookbookRepositoryStub: AddCookbookRepository
}

const makeSut = (): SutTypes => {
  const addCookbookRepositoryStub = makeAddCookbookRepository()
  const sut = new DbAddCookbook(addCookbookRepositoryStub)
  return {
    sut,
    addCookbookRepositoryStub
  }
}

describe('DbAddCookbook Usecase', () => {
  test('Should call AddCookbookRepository with correct values', async () => {
    const { sut, addCookbookRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCookbookRepositoryStub, 'addCookbook')
    const cookbook = await mockAddCookbook()
    await sut.addCookbook(cookbook)
    expect(addSpy).toHaveBeenCalledWith(cookbook)
  })

  test('Should throw if AddCookbookRepository thows', async () => {
    const { sut, addCookbookRepositoryStub } = makeSut()
    jest.spyOn(addCookbookRepositoryStub, 'addCookbook').mockRejectedValue(new Error())
    const cookbook = await mockAddCookbook()
    const promise = sut.addCookbook(cookbook)
    await expect(promise).rejects.toThrow()
  })
})
