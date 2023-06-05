/* eslint-disable no-undef */
import { mockUpdateRecipe, mockReturnRecipe } from '../../../domain/mocks/menus'
import { DbUpdateRecipe } from './db-update-recipe'
import { RecipeModel, UpdateRecipeRepository, UpdateRecipeModel } from './db-update-recipe-protocols'

const makeUpdateRecipeRepository = (): UpdateRecipeRepository => {
  class UpdateRecipeRepositoryStub implements UpdateRecipeRepository {
    async updateRecipe (recipeData: UpdateRecipeModel): Promise<RecipeModel> {
      return new Promise(resolve => resolve(mockReturnRecipe()))
    }
  }
  return new UpdateRecipeRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateRecipe
  UpdateRecipeRepositoryStub: UpdateRecipeRepository
}

const makeSut = (): SutTypes => {
  const UpdateRecipeRepositoryStub = makeUpdateRecipeRepository()
  const sut = new DbUpdateRecipe(UpdateRecipeRepositoryStub)
  return {
    sut,
    UpdateRecipeRepositoryStub
  }
}

describe('DbUpdateRecipe Usecase', () => {
  test('Should call UpdateRecipeRepositoryStub with correct values', async () => {
    const { sut, UpdateRecipeRepositoryStub } = makeSut()
    const UpdateSpy = jest.spyOn(UpdateRecipeRepositoryStub, 'updateRecipe')
    const recipeResult = await mockUpdateRecipe()
    await sut.updateRecipe(recipeResult)
    expect(UpdateSpy).toHaveBeenCalledWith(recipeResult)
  })

  test('Should throw if UpdateRecipeRepositoryStub thows', async () => {
    const { sut, UpdateRecipeRepositoryStub } = makeSut()
    jest.spyOn(UpdateRecipeRepositoryStub, 'updateRecipe').mockRejectedValue(new Error())
    const recipeResult = await mockUpdateRecipe()
    const promise = sut.updateRecipe(recipeResult)
    await expect(promise).rejects.toThrow()
  })
})
