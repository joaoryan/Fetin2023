export const stepCombiOvenTSIParamsSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number'
          },
        recipeId: {
          type: 'number'
        },
        menuId: {
          type: 'number'
        },
        equipTypeId: {
          type: 'number'
        },
        stepPosition: {
          type: 'number'
        },
        isActive: {
          type: 'boolean'
        },
        stepTemperature: {
          type: 'number'
        },
        steamPercentage: {
          type: 'number'
        },
        fanSpeed: {
          type: 'number'
        },
        steamInjection: {
            type: 'number'
        },
        endByTime: {
            type: 'boolean'
        },
        stepTime: {
            type: 'number'
        },
        stepInfo: {
            type: 'string'
        }
    },
    required: ['id', 'recipeId', 'menuId', 'equipTypeId', 'stepPosition', 'isActive', 'stepTemperature', 'steamPercentage', 'fanSpeed', 'steamInjection', 'endByTime', 'stepTime', 'stepInfo']
  }
  