import { AddRecipeModel } from '../../../../domain/usecases/add-recipe'
import { RecipeModel } from '../../../../domain/models/recipe'

export const mapCreatedRecipe = (addedRecipe: AddRecipeModel, addedRecipeId: number): RecipeModel => {
  return Object.assign({}, addedRecipe, { id: addedRecipeId })
}
