export const addRecipeCmaxSchema = {
  type: 'object',
  properties: {
    equipTypeId: {
      type: 'integer'
    },
    menuId: {
      type: 'integer'
    },
    recipeName: {
      type: 'string'
    },
    recipePosition: {
      type: 'number'
    },
    creationDate: {
      type: 'integer',
      format: 'date-time'
    },
    createdBy: {
      type: 'integer'
    },
    lastUpdate: {
      type: 'integer',
      format: 'date-time'
    },
    updatedBy: {
      type: 'integer'
    },
    preheatOn: {
      type: 'boolean'
    },
    preheatTemp: {
      type: 'number'
    },
    preheatFunction: {
      type: 'number'
    },
    preheatSteamLevel: {
      type: 'number'
    },
    weight: {
      type: 'number'
    },
    entryTemp: {
      type: 'number'
    },
    ingredientType: {
      type: 'number'
    },
    dishType: {
      type: 'number'
    },
    ingredients: {
      type: 'string'
    },
    instructions: {
      type: 'string'
    },
    origin: {
      type: 'string'
    }
  },
  required: ['equipTypeId', 'menuId', 'recipeName', 'recipePosition', 'creationDate', 'createdBy', 'lastUpdate', 'updatedBy', 'preheatOn', 'preheatTemp', 'preheatFunction', 'preheatSteamLevel', 'weight', 'entryTemp', 'ingredientType', 'dishType', 'ingredients', 'instructions', 'origin' ]
}
