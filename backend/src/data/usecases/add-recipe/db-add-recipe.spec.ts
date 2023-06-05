/* eslint-disable no-undef */
import { RecipeModel } from '../../../domain/models/recipe'
import { DbAddRecipe } from './db-add-recipe'
import { AddRecipeModel, AddRecipeRepository } from './db-add-recipe-protocols'
import { mockAddRecipe, mockReturnRecipe } from '../../../domain/mocks/menus'

const makeAddRecipeRepository = (): AddRecipeRepository => {
  class AddRecipeRepositoryStub implements AddRecipeRepository {
    async addRecipe (recipeData: AddRecipeModel): Promise<RecipeModel> {
      return new Promise(resolve => resolve(mockReturnRecipe()))
    }
  }
  return new AddRecipeRepositoryStub()
}

interface SutTypes {
  sut: DbAddRecipe
  addRecipeRepositoryStub: AddRecipeRepository
}

const makeSut = (): SutTypes => {
  const addRecipeRepositoryStub = makeAddRecipeRepository()
  const sut = new DbAddRecipe(addRecipeRepositoryStub)
  return {
    sut,
    addRecipeRepositoryStub
  }
}

describe('DbAddRecipe Usecase', () => {
  test('Should call AddRecipeRepository with correct values', async () => {
    const { sut, addRecipeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRecipeRepositoryStub, 'addRecipe')
    const recipeResult = await mockAddRecipe()
    await sut.addRecipe(recipeResult)
    expect(addSpy).toHaveBeenCalledWith(recipeResult)
  })

  test('Should throw if AddRecipeRepository thows', async () => {
    const { sut, addRecipeRepositoryStub } = makeSut()
    jest.spyOn(addRecipeRepositoryStub, 'addRecipe').mockRejectedValue(new Error())
    const recipeResult = await mockAddRecipe()
    const promise = sut.addRecipe(recipeResult)
    await expect(promise).rejects.toThrow()
  })
})
