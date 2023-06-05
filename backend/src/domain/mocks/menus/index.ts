/* eslint-disable no-undef */
import { deleteAll, insertOne } from '../../../infra/db/mysql/mysql-helper'
import env from '../../../main/config/env'
import mysql from 'mysql'
import { AddMenuConfigsModel } from '../../usecases/add-menu-configs'
import { MenuConfigsModel } from '../../models/menu-configs'
import { UpdateMenuConfigsModel } from '../../usecases/update-menu-configs'
import { MenuModel } from '../../models/menu'
import { AddMenuModel } from '../../usecases/add-menu'
import { UpdateMenuModel } from '../../usecases/update-menu'
import { MenuGroupModel } from '../../models/menu-group'
import { AddGroupModel } from '../../usecases/add-group'
import { UpdateGroupModel } from '../../usecases/update-group'
import { RecipeModel } from '../../models/recipe'
import { RecipeCMAXModel } from '../../models/recipeCMAX'
import { AddRecipeModel } from '../../usecases/add-recipe'
import { UpdateRecipeModel } from '../../usecases/update-recipe'
import { AddRecipeCMAXModel } from '../../usecases/add-recipeCMAX'
import { UpdateRecipeCmaxModel } from '../../usecases/update-recipeCMAX'
import { StepSpeedOvenModel } from '../../models/stepSpeedOven'
import { StepCombiOvenTSIModel } from '../../models/stepCombiOvenTSI'
import { StepCombiOvenCMAXModel } from '../../models/stepCombiOvenCMAX'
import { HttpRequest } from '../../../presentation/protocols'
import { mockInsertCompany } from '../user'
import { AddStepSpeedOvenModel } from '../../usecases/add-step-SpeedOven'
import { UpdateStepSpeedOvenModel } from '../../usecases/update-step-SpeedOven'
import { AddStepCombiOvenTSIModel } from '../../usecases/add-step-CombiOvenTSI'
import { UpdateStepCombiOvenTSIModel } from '../../usecases/update-step-CombiOvenTSI'
import { AddStepCombiOvenCMAXModel } from '../../usecases/add-step-CombiOvenCMAX'
import { UpdateStepCombiOvenCMAXModel } from '../../usecases/update-step-CombiOvenCMAX'

afterAll(() => {
  testConnection.end()
})

const testConnection = mysql.createPool(env.dbTest)

// Menu

export const mockMenuModel = (idCompany: number): MenuModel => (
  {
    menuName: 'menuName',
    equipTypeId: 1,
    companyId: idCompany,
    creationDate: '24-04-2022',
    lastUpdate: '24-04-2022',
    menuVersion: 1,
    deletionDate: '24-042022',
    userId: 1,
    deletedBy: 'valid_name',
    language: 'valid_language'
  }
)

export const mockInsertMenu = async (): Promise<{ idMenu: number, idCompany: number }> => {
  const result = await mockInsertCompany()
  await deleteAll(testConnection, 'menu')
  const menuResult = await insertOne(testConnection, 'menu', mockMenuModel(result.idCompany))
  return { idMenu: menuResult.insertId, idCompany: result.idCompany }
}

export const mockAddMenu = async (): Promise<AddMenuModel> => {
  const companyResult = await mockInsertCompany()
  const result = mockMenuModel(companyResult.idCompany)
  return result
}

export const mockUpdateMenu = async (): Promise<UpdateMenuModel> => {
  const menuResult = await mockInsertMenu()
  const result = Object.assign(await mockMenuModel(menuResult.idCompany), { id: menuResult.idMenu })
  return result
}

export const mockReturnMenu = (): MenuModel => (Object.assign(mockMenuModel(1), { id: 1 }))

export const mockReturnMenuAndConfig = (): any => (Object.assign(mockReturnMenu(), { configs: mockReturnMenuConfig() }))

export const mockReturnMenuAll = (): any => (
  Object.assign(mockReturnMenu(),
    { configs: mockReturnMenuConfig() },
    {
      groups: [Object.assign(mockReturnGroup(),
        {
          recipes: [Object.assign(mockReturnRecipe(),
            {
              steps: mockReturnStepSpeedOven()
            })]
        })]
    }
  )
)

export const mockUpdateMenuRequest = async (): Promise<HttpRequest> => {
  const resultMenu = await mockUpdateMenu()
  const resultMenuConfig = await mockUpdateMenuConfig()
  const httpRequest = {
    body: {
      menu: resultMenu,
      menuConfigs: resultMenuConfig
    },
    params: {
      id: resultMenu.id
    }
  }
  return httpRequest
}

export const mockDeleteMenuRequest = async (): Promise<HttpRequest> => {
  const resultMenu = await mockInsertMenu()
  const httpRequest = {
    params: {
      id: resultMenu.idMenu
    }
  }
  return httpRequest
}

export const mockAddMenuRequest = async (): Promise<HttpRequest> => {
  const menuResult = await mockAddMenu()
  const menuConfigResult = mockMenuConfigModel(1)
  delete (menuConfigResult.menuId)
  const httpRequest = {
    body: {
      menu: menuResult,
      menuConfigs: menuConfigResult
    }
  }
  return httpRequest
}

export const mockLoadMenuByCompanyIdRequest = async (): Promise<HttpRequest> => {
  const menuResult = await mockInsertMenu()
  const httpRequest = {
    params: {
      companyId: menuResult.idCompany
    }
  }
  return httpRequest
}

export const mockLoadMenuIdRequest = async (): Promise<HttpRequest> => {
  const menuAllResult = await mockInsertStepSpeedOven()
  const httpRequest = {
    params: {
      id: menuAllResult.idMenu
    }
  }
  return httpRequest
}

// Menu config mock

export const mockMenuConfigModel = (idMenu: number): MenuConfigsModel => (
  {
    menuId: idMenu,
    preHeat1: 1,
    preHeat2: 1,
    preHeat2Enabled: false,
    stabilizationTime: '11:11',
    dateFormat: 'ISO: AAAA/MM/DD',
    timeFormat: '24h',
    manualModeEnabled: false,
    favoritesEnabled: false,
    repeatRecipeEnabled: false,
    heatBrownMoreEnabled: false,
    temperatureUnit: 'Cº',
    weightUnit: 'gramas',
    theme: 'theme',
    introduction: false,
    combiOvenEnabled: false,
    multipleCookingEnabled: false,
    technicookRecipesEnabled: false,
    editGroupsEnabled: false,
    operatorModeEnabled: false
  }
)

export const mockAddMenuConfig = async (): Promise<AddMenuConfigsModel> => {
  const menuResult = await mockInsertMenu()
  const result = mockMenuConfigModel(menuResult.idMenu)
  return result
}

export const mockUpdateMenuConfig = async (): Promise<UpdateMenuConfigsModel> => {
  const menuConfigResult = await mockInsertMenuConfig()
  const result = Object.assign(mockMenuConfigModel(menuConfigResult.idMenu), { id: menuConfigResult.idConfig })
  return result
}

export const mockReturnMenuConfig = (): MenuConfigsModel => (Object.assign(mockMenuConfigModel(1), { id: 1 }))

export const mockInsertMenuConfig = async (): Promise<{ idCompany: number, idMenu: number, idConfig: number }> => {
  const result = await mockInsertMenu()
  await deleteAll(testConnection, 'menuConfigs')
  const menuConfigResult = await insertOne(testConnection, 'menuConfigs', mockMenuConfigModel(result.idMenu))
  return { idCompany: result.idCompany, idMenu: result.idMenu, idConfig: menuConfigResult.insertId }
}

// Group mock

export const mockGroupModel = (idMenu: number): MenuGroupModel => (
  {
    menuId: idMenu,
    groupName: 'name',
    groupPosition: 1,
    groupImage: 'img',
    preHeat: 100,
    creationDate: '00/00/0000',
    lastUpdate: '00/00/0000'
  }
)

export const mockInsertGroup = async (): Promise<{ idMenu: number, idGroup: number }> => {
  const result = await mockInsertMenu()
  await deleteAll(testConnection, 'groups')
  const groupResult = await insertOne(testConnection, 'groups', mockGroupModel(result.idMenu))
  return { idMenu: result.idMenu, idGroup: groupResult.insertId }
}

export const mockAddGroup = async (): Promise<AddGroupModel> => {
  const menu = await mockInsertMenu()
  const group = mockGroupModel(menu.idMenu)
  return group
}

export const mockUpdateGroup = async (): Promise<UpdateGroupModel> => {
  const resultGroup = await mockInsertGroup()
  const result = Object.assign(await mockGroupModel(resultGroup.idMenu), { id: resultGroup.idGroup })
  return result
}

export const mockReturnGroup = (): MenuGroupModel => (Object.assign(mockGroupModel(1), { id: 1 }))

export const mockAddGroupRequest = async (): Promise<HttpRequest> => {
  const result = await mockAddGroup()
  const httpRequest = {
    body: {
      group: result
    }
  }
  return httpRequest
}

export const mockUpdateGroupRequest = async (): Promise<HttpRequest> => {
  const result = await mockUpdateGroup()
  const httpRequest = {
    body: {
      group: result
    },
    params: {
      id: result.id
    }
  }
  return httpRequest
}

export const mockLoadGroupRequest = async (): Promise<HttpRequest> => {
  const resultGroup = await mockInsertGroup()
  const httpRequest = {
    params: {
      idMenu: resultGroup.idMenu
    }
  }
  return httpRequest
}

export const mockDeleteGroupRequest = async (): Promise<HttpRequest> => {
  const resultGroup = await mockInsertGroup()
  const httpRequest = {
    params: {
      id: resultGroup.idGroup
    }
  }
  return httpRequest
}

// Recipe mock

export const mockRecipeModel = (idMenu: number, idGroup: number): RecipeModel => (
  {
    equipTypeId: 1,
    groupId: idGroup,
    menuId: idMenu,
    recipeName: 'name',
    recipePosition: 1,
    recipeImage: 'img',
    creationDate: '0000-00-00 00:00:00',
    createdBy: 1,
    lastUpdate: '0000-00-00 00:00:00',
    updatedBy: 1,
    isFavorite: true,
    heatMore: 1,
    brownMore: 1,
    heatBrownMore: 1,
    ingredientType: 1,
    dishType: 1,
    ingredients: 'ingredients',
    instructions: 'instructions',
    weight: 1,
    entryTemp: 1,
    preHeatTemp: 1,
    origin: 'origin'
  }
)

export const mockInsertRecipe = async (): Promise<{ idMenu: number, idGroup: number, idRecipe: number }> => {
  const result = await mockInsertGroup()
  await deleteAll(testConnection, 'recipe')
  const recipeResult = await insertOne(testConnection, 'recipe', mockRecipeModel(result.idMenu, result.idGroup))
  return { idMenu: result.idMenu, idGroup: result.idGroup, idRecipe: recipeResult.insertId }
}

export const mockAddRecipe = async (): Promise<AddRecipeModel> => {
  const group = await mockInsertGroup()
  const recipe = mockRecipeModel(group.idMenu, group.idGroup)
  return recipe
}

export const mockUpdateRecipe = async (): Promise<UpdateRecipeModel> => {
  const resultRecipe = await mockInsertRecipe()
  const recipe = Object.assign(await mockRecipeModel(resultRecipe.idMenu, resultRecipe.idGroup), { id: resultRecipe.idRecipe })
  return recipe
}

export const mockReturnRecipe = (): RecipeModel => Object.assign(mockRecipeModel(1, 1), { id: 1 })

export const mockAddRecipeRequest = async (): Promise<HttpRequest> => {
  const resultRecipe = await mockAddRecipe()
  const httpRequest = {
    body: {
      recipe: [resultRecipe]
    }
  }
  return httpRequest
}

export const mockUpdateRecipeRequest = async (): Promise<HttpRequest> => {
  const resultRecipe = await mockUpdateRecipe()
  const httpRequest = {
    body: {
      recipe: resultRecipe
    },
    params: {
      id: resultRecipe.id
    }
  }
  return httpRequest
}

export const mockLoadRecipeRequest = async (): Promise<HttpRequest> => {
  const recipe = await mockInsertRecipe()
  const httpRequest = {
    params: {
      id: recipe.idGroup
    }
  }
  return httpRequest
}

export const mockDeleteRecipeRequest = async (): Promise<HttpRequest> => {
  const resultRecipe = await mockInsertRecipe()
  const httpRequest = {
    body: {
      idArray: [
        resultRecipe.idRecipe
      ],
      equipType: 1
    }
  }
  return httpRequest
}

export const mockRecipeCmaxModel = (idMenu: number): RecipeCMAXModel => (
  {
    equipTypeId: 4,
    menuId: idMenu,
    recipeName: 'name',
    recipePosition: 1,
    creationDate: '00/00/0000',
    createdBy: 1,
    lastUpdate: '00/00/0000',
    updatedBy: 1,
    preheatOn: true,
    preheatTemp: 1,
    preheatFunction: true,
    preheatSteamLevel: 1,
    weight: 1,
    entryTemp: 1,
    ingredientType: 1,
    dishType: 1,
    ingredients: 'ingredients',
    instructions: 'instructions',
    origin: 'origin'
  }
)

export const mockInsertRecipeCmax = async (): Promise<{ idMenu: number, idRecipeCmax: number }> => {
  const result = await mockInsertMenu()
  await deleteAll(testConnection, 'cmaxRecipe')
  const recipeCmaxResult = await insertOne(testConnection, 'cmaxRecipe', mockRecipeCmaxModel(result.idMenu))
  return { idMenu: result.idMenu, idRecipeCmax: recipeCmaxResult.insertId }
}

export const mockAddRecipeCmax = async (): Promise<AddRecipeCMAXModel> => {
  const menu = await mockInsertMenu()
  const recipe = mockRecipeCmaxModel(menu.idMenu)
  return recipe
}

export const mockUpdateRecipeCmax = async (): Promise<UpdateRecipeCmaxModel> => {
  const resultRecipe = await mockInsertRecipeCmax()
  const recipe = Object.assign(await mockRecipeCmaxModel(resultRecipe.idMenu), { id: resultRecipe.idRecipeCmax })
  return recipe
}

export const mockReturnRecipeCmax = (): RecipeCMAXModel => Object.assign(mockRecipeCmaxModel(1), { id: 1 })

export const mockAddRecipeCmaxRequest = async (): Promise<HttpRequest> => {
  const resultRecipe = await mockAddRecipeCmax()
  const httpRequest = {
    body: {
      recipe: [resultRecipe]
    }
  }
  return httpRequest
}

export const mockUpdateRecipeCmaxRequest = async (): Promise<HttpRequest> => {
  const resultRecipeCmax = await mockUpdateRecipeCmax()
  const httpRequest = {
    body: {
      recipe: resultRecipeCmax
    }
  }
  return httpRequest
}

export const mockLoadRecipeCmaxRequest = async (): Promise<HttpRequest> => {
  const recipe = await mockInsertRecipeCmax()
  const httpRequest = {
    params: {
      id: recipe.idRecipeCmax
    }
  }
  return httpRequest
}

export const mockDeleteRecipeCmaxRequest = async (): Promise<HttpRequest> => {
  const resultRecipe = await mockInsertRecipeCmax()
  const httpRequest = {
    body: {
      idArray: [
        resultRecipe.idRecipeCmax
      ],
      equipType: 4
    }
  }
  return httpRequest
}

// Step speed oven mock

export const mockStepSpeedOvenModel = (idMenu: number, idRecipe: number): StepSpeedOvenModel => (
  {
    recipeId: idRecipe,
    equipTypeId: 1,
    menuId: idMenu,
    stepPosition: 1,
    isActive: true,
    stepTemperature: 1,
    tempIsPreheat: true,
    stepTime: '11:11',
    hotAirSpeed: 1,
    microwaves: 1,
    internalResistance: 1,
    stepInfo: 'info',
    stepFrom: 'fromCookbook'
  }
)

export const mockInsertStepSpeedOven = async (): Promise<{ idMenu: number, idRecipe: number, idStepSpeedOven: number }> => {
  const recipe = await mockInsertRecipe()
  await deleteAll(testConnection, 'stepSpeedOven')
  const stepSpeedOvenResult = await insertOne(testConnection, 'stepSpeedOven', mockStepSpeedOvenModel(recipe.idMenu, recipe.idRecipe))
  return { idMenu: recipe.idMenu, idRecipe: recipe.idRecipe, idStepSpeedOven: stepSpeedOvenResult.insertId }
}

export const mockAddStepSpeedOven = async (): Promise<AddStepSpeedOvenModel> => {
  const recipe = await mockInsertRecipe()
  const stepSpeedOven = mockStepSpeedOvenModel(recipe.idMenu, recipe.idRecipe)
  return stepSpeedOven
}

export const mockUpdateStepSpeedOven = async (): Promise<UpdateStepSpeedOvenModel> => {
  const resultStepSpeedOven = await mockInsertStepSpeedOven()
  const stepSpeedOven = Object.assign(await mockStepSpeedOvenModel(resultStepSpeedOven.idMenu, resultStepSpeedOven.idRecipe), { id: resultStepSpeedOven.idStepSpeedOven })
  return stepSpeedOven
}

export const mockReturnStepSpeedOven = (): StepSpeedOvenModel => Object.assign(mockStepSpeedOvenModel(1, 1), { id: 1 })

export const mockAddStepSpeedOvenRequest = async (): Promise<HttpRequest> => {
  const resultStepSpeedOven = await mockAddStepSpeedOven()
  const httpRequest = {
    body: {
      stepSpeedOven: resultStepSpeedOven
    }
  }
  return httpRequest
}

export const mockUpdateStepSpeedOvenRequest = async (): Promise<HttpRequest> => {
  const resultStepSpeedOven = await mockUpdateStepSpeedOven()
  const httpRequest = {
    body: {
      stepSpeedOven: resultStepSpeedOven
    },
    params: {
      id: resultStepSpeedOven.id
    }
  }
  return httpRequest
}

export const mockLoadStepSpeedOvenRequest = async (): Promise<HttpRequest> => {
  const stepSpeedOven = await mockInsertStepSpeedOven()
  const httpRequest = {
    params: {
      id: stepSpeedOven.idRecipe
    }
  }
  return httpRequest
}

export const mockDeleteStepSpeedOvenRequest = async (): Promise<HttpRequest> => {
  const resultStepSpeedOven = await mockInsertStepSpeedOven()
  const httpRequest = {
    params: {
      id: resultStepSpeedOven.idStepSpeedOven
    }
  }
  return httpRequest
}

export const mockLoadStepsSpeedOvenByRecipeIdRequest = async (): Promise<HttpRequest> => {
  const stepSpeedOvenResult = await mockInsertStepSpeedOven()
  const httpRequest = {
    params: {
      recipeId: stepSpeedOvenResult.idRecipe,
      stepFrom: 'fromCookbook'
    }
  }
  return httpRequest
}

export const mockLoadStepsSpeedOvenByRecipeIdResponse = (): StepSpeedOvenModel[] => ([{
  id: 1,
  recipeId: 1,
  equipTypeId: 1,
  menuId: 1,
  stepPosition: 1,
  isActive: true,
  stepTemperature: 1,
  tempIsPreheat: true,
  stepTime: '11:11',
  hotAirSpeed: 1,
  microwaves: 1,
  internalResistance: 1,
  stepInfo: 'info',
  stepFrom: 'fromCookbook'
}, {
  id: 2,
  recipeId: 1,
  equipTypeId: 1,
  menuId: 1,
  stepPosition: 2,
  isActive: false,
  stepTemperature: 2,
  tempIsPreheat: false,
  stepTime: '11:11',
  hotAirSpeed: 2,
  microwaves: 2,
  internalResistance: 2,
  stepInfo: 'info2',
  stepFrom: 'fromCookbook'
}])

// step tsi mock

export const mockStepCombiOvenTSIModel = (idMenu: number, idRecipe: number): StepCombiOvenTSIModel => (
  {
    recipeId: idRecipe,
    equipTypeId: 1,
    menuId: idMenu,
    stepPosition: 1,
    isActive: true,
    stepTemperature: 1,
    steamPercentage: 1,
    fanSpeed: 1,
    steamInjection: 1,
    stepInfo: 'info',
    endByTime: true,
    stepTime: 1,
    probeTargetTemp: 1,
    stepFrom: 'fromCookbook'
  }
)

export const mockInsertStepCombiOvenTSI = async (): Promise<{ idMenu: number, idRecipe: number, idStep: number }> => {
  const result = await mockInsertRecipe()
  await deleteAll(testConnection, 'stepCombiOvenTSI')
  const stepResult = await insertOne(testConnection, 'stepCombiOvenTSI', mockStepCombiOvenTSIModel(result.idMenu, result.idRecipe))
  return { idMenu: result.idMenu, idRecipe: result.idRecipe, idStep: stepResult.insertId }
}

export const mockAddStepCombiOvenTSI = async (): Promise<AddStepCombiOvenTSIModel> => {
  const recipe = await mockInsertRecipe()
  const stepCombiOvenTSI = mockStepCombiOvenTSIModel(recipe.idMenu, recipe.idRecipe)
  return stepCombiOvenTSI
}

export const mockUpdateStepCombiOvenTSI = async (): Promise<UpdateStepCombiOvenTSIModel> => {
  const resultStepCombiOvenTSI = await mockInsertStepCombiOvenTSI()
  const stepCombiOvenTSI = Object.assign(await mockStepCombiOvenTSIModel(resultStepCombiOvenTSI.idMenu, resultStepCombiOvenTSI.idRecipe), { id: resultStepCombiOvenTSI.idStep })
  return stepCombiOvenTSI
}

export const mockReturnStepCombiOvenTSI = (): StepCombiOvenTSIModel => Object.assign(mockStepCombiOvenTSIModel(1, 1), { id: 1 })

export const mockAddStepCombiOvenTSIRequest = async (): Promise<HttpRequest> => {
  const resultStepCombiOvenTSI = await mockAddStepCombiOvenTSI()
  const httpRequest = {
    body: {
      stepCombiOvenTSI: resultStepCombiOvenTSI
    }
  }
  return httpRequest
}

export const mockUpdateStepCombiOvenTSIRequest = async (): Promise<HttpRequest> => {
  const resultStepCombiOvenTSI = await mockUpdateStepCombiOvenTSI()
  const httpRequest = {
    body: {
      stepCombiOvenTSI: resultStepCombiOvenTSI
    },
    params: {
      id: resultStepCombiOvenTSI.id
    }
  }
  return httpRequest
}

export const mockLoadStepCombiOvenTSIRequest = async (): Promise<HttpRequest> => {
  const stepCombiOvenTSI = await mockInsertStepCombiOvenTSI()
  const httpRequest = {
    params: {
      id: stepCombiOvenTSI.idRecipe,
      stepFrom: 'fromCookbook'
    }
  }
  return httpRequest
}

export const mockDeleteStepCombiOvenTSIRequest = async (): Promise<HttpRequest> => {
  const resultStepCombiOvenTSI = await mockInsertStepCombiOvenTSI()
  const httpRequest = {
    params: {
      id: resultStepCombiOvenTSI.idStep
    }
  }
  return httpRequest
}

// step c-max mock

export const mockStepCombiOvenCMAXModel = (idMenu: number, idRecipeCmax: number): StepCombiOvenCMAXModel => (
  {
    recipeId: idRecipeCmax,
    menuId: idMenu,
    stepPosition: 1,
    isActive: true,
    stepTemperature: 1,
    ovenFunction: 1,
    timeOrProbe: 1,
    stepTime: 1,
    probeTargetTemp: 1,
    stepSteamLevel: 1,
    steamInjection: 1,
    dumperStatus: 1,
    stepFrom: 'fromCookbook'
  }
)

export const mockInsertStepCombiOvenCMAX = async (): Promise<{ idMenu: number, idRecipeCmax: number, idStep: number }> => {
  const result = await mockInsertRecipeCmax()
  await deleteAll(testConnection, 'stepCombiOvenCMAX')
  const stepResult = await insertOne(testConnection, 'stepCombiOvenCMAX', mockStepCombiOvenCMAXModel(result.idMenu, result.idRecipeCmax))
  return { idMenu: result.idMenu, idRecipeCmax: result.idRecipeCmax, idStep: stepResult.insertId }
}

export const mockAddStepCombiOvenCMAX = async (): Promise<AddStepCombiOvenCMAXModel> => {
  const recipe = await mockInsertRecipeCmax()
  const stepCombiOvenCMAX = mockStepCombiOvenCMAXModel(recipe.idMenu, recipe.idRecipeCmax)
  return stepCombiOvenCMAX
}

export const mockUpdateStepCombiOvenCMAX = async (): Promise<UpdateStepCombiOvenCMAXModel> => {
  const resultStepCombiOvenCMAX = await mockInsertStepCombiOvenCMAX()
  const stepCombiOvenCMAX = Object.assign(await mockStepCombiOvenCMAXModel(resultStepCombiOvenCMAX.idMenu, resultStepCombiOvenCMAX.idRecipeCmax), { id: resultStepCombiOvenCMAX.idStep })
  return stepCombiOvenCMAX
}

export const mockReturnStepCombiOvenCMAX = (): StepCombiOvenCMAXModel => Object.assign(mockStepCombiOvenCMAXModel(1, 1), { id: 1 })

export const mockAddStepCombiOvenCMAXRequest = async (): Promise<HttpRequest> => {
  const resultStepCombiOvenCMAX = await mockAddStepCombiOvenCMAX()
  const httpRequest = {
    body: {
      stepCombiOvenCMAX: resultStepCombiOvenCMAX
    }
  }
  return httpRequest
}

export const mockUpdateStepCombiOvenCMAXRequest = async (): Promise<HttpRequest> => {
  const resultStepCombiOvenCMAX = await mockUpdateStepCombiOvenCMAX()
  const httpRequest = {
    body: {
      stepCombiOvenCMAX: resultStepCombiOvenCMAX
    },
    params: {
      id: resultStepCombiOvenCMAX.id
    }
  }
  return httpRequest
}

export const mockLoadStepCombiOvenCMAXRequest = async (): Promise<HttpRequest> => {
  const stepCombiOvenCMAX = await mockInsertStepCombiOvenCMAX()
  const httpRequest = {
    params: {
      id: stepCombiOvenCMAX.idRecipeCmax,
      stepFrom: 'fromCookbook'
    }
  }
  return httpRequest
}

export const mockDeleteStepCombiOvenCMAXRequest = async (): Promise<HttpRequest> => {
  const resultStepCombiOvenCMAX = await mockInsertStepCombiOvenCMAX()
  const httpRequest = {
    params: {
      id: resultStepCombiOvenCMAX.idStep
    }
  }
  return httpRequest
}
