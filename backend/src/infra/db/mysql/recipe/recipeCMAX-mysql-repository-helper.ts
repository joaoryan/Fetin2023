import { AddRecipeCMAXModel } from '../../../../domain/usecases/add-recipeCMAX'
import { RecipeCMAXModel } from '../../../../domain/models/recipeCMAX'

export const mapCreatedRecipeCMAX = (addedRecipe: AddRecipeCMAXModel, addedRecipeId: number): RecipeCMAXModel => {
  return Object.assign({}, addedRecipe, { id: addedRecipeId })
}
