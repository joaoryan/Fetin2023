import { RecipeCMAXModel } from '../models/recipeCMAX'

export interface UpdateRecipeCmaxModel {
  id: number,
  equipTypeId?: number,
  menuId?: number,
  recipeName?: string,
  recipePosition?: number,
  creationDate?: string,
  createdBy?: number,
  lastUpdate?: string,
  updatedBy?: number,
  preheatOn?: boolean,
  preheatTemp?: number,
  preheatFunction?: boolean,
  preheatSteamLevel?: number,
  weight?: number,
  entryTemp?: number,
  ingredientType?: number,
  dishType?: number,
  ingredients?: string,
  instructions?: string,
  origin?: string
}
export interface UpdateRecipeCMAX {
  updateRecipeCMAX(recipe: UpdateRecipeCmaxModel): Promise<RecipeCMAXModel>
}
