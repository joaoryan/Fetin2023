import { UpdateRecipe, RecipeModel, UpdateRecipeRepository, UpdateRecipeModel } from './db-update-recipe-protocols'

export class DbUpdateRecipe implements UpdateRecipe {
  private readonly UpdateRecipeRepository: UpdateRecipeRepository

  constructor (UpdateRecipeRepository: UpdateRecipeRepository) {
    this.UpdateRecipeRepository = UpdateRecipeRepository
  }

  async updateRecipe (recipe: UpdateRecipeModel): Promise<RecipeModel> {
    const recipeResult = await this.UpdateRecipeRepository.updateRecipe(recipe)
    return recipeResult
  }
}
