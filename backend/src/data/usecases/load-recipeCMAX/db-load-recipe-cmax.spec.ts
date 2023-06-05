/* eslint-disable no-undef */
import { DbLoadRecipeCMAX } from './db-load-recipe-cmax'
import { LoadRecipeCMAX, RecipeCMAXModel, LoadRecipeCMAXRepository } from './db-load-recipe-cmax-protocols'
import { mockInsertRecipeCmax, mockReturnRecipeCmax } from '../../../domain/mocks/menus'

const makeLoadRecipeCMAXRepository = (): LoadRecipeCMAXRepository => {
  class LoadRecipeCMAXRepositoryStub implements LoadRecipeCMAXRepository {
    async loadRecipeCMAX (idMenu: number): Promise<RecipeCMAXModel[]> {
      return new Promise(resolve => resolve([mockReturnRecipeCmax()]))
    }
  }
  return new LoadRecipeCMAXRepositoryStub()
}

interface SutTypes {
  sut: LoadRecipeCMAX
  loadRecipeCMAXRepositoryStub: LoadRecipeCMAXRepository
}

const makeSut = (): SutTypes => {
  const loadRecipeCMAXRepositoryStub = makeLoadRecipeCMAXRepository()
  const sut = new DbLoadRecipeCMAX(loadRecipeCMAXRepositoryStub)
  return {
    sut,
    loadRecipeCMAXRepositoryStub
  }
}

describe('DbLoadRecipeCMAX Usecase', () => {
  test('Should call LoadRecipeCMAXRepository with correct values', async () => {
    const { sut, loadRecipeCMAXRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadRecipeCMAXRepositoryStub, 'loadRecipeCMAX')
    const recipeResult = await mockInsertRecipeCmax()
    await sut.loadRecipeCMAX(recipeResult.idMenu)
    expect(addSpy).toHaveBeenCalledWith(recipeResult.idMenu)
  })

  test('Should throw if LoadRecipeCMAXRepository thows', async () => {
    const { sut, loadRecipeCMAXRepositoryStub } = makeSut()
    jest.spyOn(loadRecipeCMAXRepositoryStub, 'loadRecipeCMAX').mockRejectedValue(new Error())
    const promise = sut.loadRecipeCMAX(1)
    await expect(promise).rejects.toThrow()
  })
})
