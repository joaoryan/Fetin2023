/* eslint-disable no-undef */
import { DbLoadRecipeCookbook } from './db-load-cookbook'
import { LoadRecipeCookbook, RecipeCookbookModel, LoadRecipeCookbookRepository } from './db-load-cookbook-protocols'
import { mockReturnCookbook } from '../../../domain/mocks/cookbook'

const makeLoadRecipeCookbookRepository = (): LoadRecipeCookbookRepository => {
  class LoadRecipeCookbookRepositoryStub implements LoadRecipeCookbookRepository {
    loadRecipeCookbook (idCompany: number): Promise<RecipeCookbookModel[]> {
      return new Promise(resolve => resolve([mockReturnCookbook()]))
    }
  }
  return new LoadRecipeCookbookRepositoryStub()
}

interface SutTypes {
  sut: LoadRecipeCookbook
  loadRecipeCookbookRepositoryStub: LoadRecipeCookbookRepository
}

const makeSut = (): SutTypes => {
  const loadRecipeCookbookRepositoryStub = makeLoadRecipeCookbookRepository()
  const sut = new DbLoadRecipeCookbook(loadRecipeCookbookRepositoryStub)
  return {
    sut,
    loadRecipeCookbookRepositoryStub
  }
}

describe('DbLoadRecipeCookbook Usecase', () => {
  test('Should call LoadRecipeCookbookRepository with correct values', async () => {
    const { sut, loadRecipeCookbookRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadRecipeCookbookRepositoryStub, 'loadRecipeCookbook')
    await sut.loadRecipeCookbook(1)
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if LoadRecipeCookbookRepository thows', async () => {
    const { sut, loadRecipeCookbookRepositoryStub } = makeSut()
    jest.spyOn(loadRecipeCookbookRepositoryStub, 'loadRecipeCookbook').mockRejectedValue(new Error())
    const promise = sut.loadRecipeCookbook(1)
    await expect(promise).rejects.toThrow()
  })
})
