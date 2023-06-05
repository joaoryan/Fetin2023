import { RecipeModel } from '../../../domain/models/recipe'
import { AddRecipe, AddRecipeModel, AddRecipeRepository } from './db-add-recipe-protocols'

export class DbAddRecipe implements AddRecipe {
  private readonly addRecipeRepository: AddRecipeRepository

  constructor (addRecipeRepository: AddRecipeRepository) {
    this.addRecipeRepository = addRecipeRepository
  }

  async addRecipe (recipe: AddRecipeModel): Promise<RecipeModel | null> {
    const recipeResult = this.addRecipeRepository.addRecipe(recipe)
    return recipeResult
  }
}
