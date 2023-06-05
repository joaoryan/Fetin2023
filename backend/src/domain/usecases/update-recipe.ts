import { RecipeModel } from '../models/recipe'

export interface UpdateRecipeModel {
  id: number,
  equipTypeId?: number,
  groupId?: number,
  menuId?: number,
  recipeName?: string,
  recipePosition?: number,
  recipeImage?: string,
  creationDate?: string,
  createdBy?: number,
  lastUpdate?: string,
  updatedBy?: number,
  isFavorite?: boolean,
  heatMore?: number,
  brownMore?: number,
  heatBrownMore?: number,
  ingredientType?: number,
  dishType?: number,
  ingredients?: string,
  instructions?: string,
  weight?: number,
  entryTemp?: number,
  preHeatTemp?: number,
  origin?: string
}
export interface UpdateRecipe {
  updateRecipe(recipe: UpdateRecipeModel): Promise<RecipeModel>
}
