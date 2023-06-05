export const addStepCombiOvenCMAXParamsSchema = {
    type: 'object',
    properties: {
      stepCombiOvenCMAX: {
        recipeId: {
          type: 'number'
        },
        menuId: {
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
        ovenFunction: {
          type: 'number'
        },
        timeOrProbe: {
          type: 'number'
        },
        stepTime: {
          type: 'number'
        },
        probeTargetTemp: {
            type: 'number'
        },
        stepSteamLevel: {
            type: 'number'
        },
        steamInjection: {
            type: 'number'
        },
        dumperStatus: {
            type: 'number'
        }
      }
    },
    required: ['recipeId', 'menuId', 'stepPosition', 'isActive', 'stepTemperature', 'ovenFunction', 'timeOrProbe', 'stepTime', 'probeTargetTemp', 'stepSteamLevel', 'steamInjection', 'dumperStatus']
  }
  