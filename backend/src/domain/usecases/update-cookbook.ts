export interface UpdateCookbookModel {
  id: number,
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

export interface UpdateCookbook {
  update(id: number, cookbook: UpdateCookbookModel): Promise<boolean>
}

// eslint-disable-next-line no-redeclare
export namespace UpdateCookbook {
  export type Request = {
    body: { cookbook?: UpdateCookbookModel }
    params: { id?: number }
  }
}
