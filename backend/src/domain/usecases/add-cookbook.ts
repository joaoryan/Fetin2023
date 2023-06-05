import { RecipeCookbookModel } from '../models/recipe-cookbook'

export interface AddCookbookModel {
  equipTypeId: number,
  recipeName: string,
  recipeImage: string,
  creationDate: string,
  createdBy: number,
  lastUpdate: string,
  updatedBy: number,
  ingredientType: number,
  dishType: number,
  ingredients: string,
  instructions: string,
  weight: number,
  entryTemp: number,
  companyId: number,
  menuId: number,
  language: number,
  origin: string,
  preHeatTemp: number
}

export interface AddCookbook {
  addCookbook(cookbook: AddCookbookModel): Promise<RecipeCookbookModel | null>
}

// eslint-disable-next-line no-redeclare
export namespace AddCookbook {
  export type Request = {
    body: { cookbook?: AddCookbookModel }
  }
}
