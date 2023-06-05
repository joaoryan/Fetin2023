export const stepSpeedOvenParamsSchema = {
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
        tempIsPreheat: {
          type: 'boolean'
        },
        stepTime: {
          type: 'number'
        },
        hotAirSpeed: {
            type: 'number'
        },
        microwaves: {
            type: 'number'
        },
        internalResistance: {
            type: 'number'
        },
        stepInfo: {
            type: 'string'
        }
    },
    required: ['id', 'recipeId', 'menuId', 'equipTypeId', 'stepPosition', 'isActive', 'stepTemperature', 'tempIsPreheat', 'stepTime', 'hotAirSpeed', 'microwaves', 'internalResistance', 'stepInfo']
}
  