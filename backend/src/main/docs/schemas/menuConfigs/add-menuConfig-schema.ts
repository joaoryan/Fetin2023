export const addMenuConfigsSchema = {
  type: 'object',
  properties: {
    preHeat1: {
      type: 'number'
    },
    preHeat2: {
      type: 'number'
    },
    preHeat2Enabled: {
      type: 'boolean'
    },
    stabilizationTime: {
      type: 'number'
    },
    dateFormat: {
      type: 'string',
      format: 'date-time'
    },
    timeFormat: {
      type: 'string'
    },
    manualModeEnabled: {
      type: 'boolean'
    },
    favoritesEnabled: {
      type: 'boolean'
    },
    repeatRecipeEnabled: {
      type: 'boolean'
    },
    heatBrownMoreEnabled: {
      type: 'boolean'
    },
    temperatureUnit: {
      type: 'string'
    },
    weightUnit: {
      type: 'string'
    },
    theme: {
      type: 'string'
    },
    introduction: {
      type: 'boolean'
    },
    combiOvenEnabled: {
      type: 'boolean'
    },
    multipleCookingEnabled: {
      type: 'boolean'
    },
    technicookRecipesEnabled: {
      type: 'boolean'
    },
    editGroupsEnabled: {
      type: 'boolean'
    },
    operatorModeEnabled: {
      type: 'boolean'
    }
  },
  required: ['preHeat1', 'preHeat2', 'preHeat2Enabled', 'stabilizationTime', 'dateFormat', 'timeFormat', 'manualModeEnabled', 'favoritesEnabled', 'repeatRecipeEnabled', 'heatBrownMoreEnabled', 'temperatureUnit', 'weightUnit', 'theme', 'introduction', 'combiOvenEnabled', 'multipleCookingEnabled', 'technicookRecipesEnabled', 'editGroupsEnabled', 'operatorModeEnabled']
}