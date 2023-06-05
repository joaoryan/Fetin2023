/* eslint-disable no-undef */
import { mockInsertRecipe, mockReturnRecipe } from '../../../domain/mocks/menus'
import { DbLoadRecipe } from './db-load-recipe'
import { LoadRecipe, RecipeModel, LoadRecipeRepository } from './db-load-recipe-protocols'

const makeLoadRecipeRepository = (): LoadRecipeRepository => {
  class LoadRecipeRepositoryStub implements LoadRecipeRepository {
    async loadRecipe (idGroup: number): Promise<RecipeModel[]> {
      return new Promise(resolve => resolve([mockReturnRecipe()]))
    }
  }
  return new LoadRecipeRepositoryStub()
}

interface SutTypes {
  sut: LoadRecipe
  loadRecipeRepositoryStub: LoadRecipeRepository
}

const makeSut = (): SutTypes => {
  const loadRecipeRepositoryStub = makeLoadRecipeRepository()
  const sut = new DbLoadRecipe(loadRecipeRepositoryStub)
  return {
    sut,
    loadRecipeRepositoryStub
  }
}

describe('DbLoadRecipe Usecase', () => {
  test('Should call LoadRecipeRepository with correct values', async () => {
    const { sut, loadRecipeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadRecipeRepositoryStub, 'loadRecipe')
    const recipeResult = await mockInsertRecipe()
    await sut.loadRecipe(recipeResult.idGroup)
    expect(addSpy).toHaveBeenCalledWith(recipeResult.idGroup)
  })

  test('Should throw if LoadRecipeRepository thows', async () => {
    const { sut, loadRecipeRepositoryStub } = makeSut()
    jest.spyOn(loadRecipeRepositoryStub, 'loadRecipe').mockRejectedValue(new Error())
    const promise = sut.loadRecipe(1)
    await expect(promise).rejects.toThrow()
  })
})
