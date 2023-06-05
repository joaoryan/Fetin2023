/* eslint-disable no-undef */
import { LoadMenuById, LoadMenuGroup, LoadRecipe, LoadStepSpeedOvenById, LoadCompanyMenuConfigs, LoadStepCombiOvenTSI, Validation, LoadStepCombiOvenCMAX, LoadRecipeCMAX } from './load-user-menu-controller-protocols'
import { LoadMenuController } from './load-menu-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MenuModel } from '../../../domain/models/menu'
import { connection } from '../../../main/config/app'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import express from 'express'
import env from '../../../main/config/env'
import mysql from 'mysql'
import { MenuConfigsModel } from '../../../domain/models/menu-configs'
import { MenuGroupModel } from '../../../domain/models/menu-group'
import { RecipeModel } from '../../../domain/models/recipe'
import { StepSpeedOvenModel } from '../../../domain/models/stepSpeedOven'
import { StepCombiOvenTSIModel } from '../../../domain/models/stepCombiOvenTSI'
import { StepCombiOvenCMAXModel } from '../../../domain/models/stepCombiOvenCMAX'
import { RecipeCMAXModel } from '../../../domain/models/recipeCMAX'
import { mockLoadMenuIdRequest, mockReturnStepCombiOvenCMAX, mockReturnStepCombiOvenTSI, mockReturnGroup, mockReturnMenu, mockReturnMenuAll, mockReturnMenuConfig, mockReturnRecipe, mockReturnRecipeCmax, mockReturnStepSpeedOven } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadMenuById = (): LoadMenuById => {
  class LoadMenuByIdStub implements LoadMenuById {
    loadMenu (idMenu: number): Promise<MenuModel | null> {
      return new Promise(resolve => resolve(mockReturnMenu()))
    }
  }
  return new LoadMenuByIdStub()
}

const makeLoadCompanyMenuConfigs = (): LoadCompanyMenuConfigs => {
  class LoadUserMenuCofigRepositoryStub implements LoadCompanyMenuConfigs {
    async loadMenuConfigs (idMenu: number): Promise<MenuConfigsModel | null> {
      return new Promise(resolve => resolve(mockReturnMenuConfig()))
    }
  }
  return new LoadUserMenuCofigRepositoryStub()
}

const makeLoadMenuGroup = (): LoadMenuGroup => {
  class LoadMenuGroupStub implements LoadMenuGroup {
    loadMenuGroup (idMenu: number): Promise<MenuGroupModel[]> {
      return new Promise(resolve => resolve([mockReturnGroup()]))
    }
  }
  return new LoadMenuGroupStub()
}

const makeLoadRecipe = (): LoadRecipe => {
  class LoadRecipeStub implements LoadRecipe {
    loadRecipe (idGroup: number): Promise<RecipeModel[]> {
      return new Promise(resolve => resolve([mockReturnRecipe()]))
    }
  }
  return new LoadRecipeStub()
}

const makeLoadRecipeCMAX = (): LoadRecipeCMAX => {
  class LoadRecipeCMAXStub implements LoadRecipeCMAX {
    loadRecipeCMAX (idRecipe: number): Promise<RecipeCMAXModel[]> {
      return new Promise(resolve => resolve([mockReturnRecipeCmax()]))
    }
  }
  return new LoadRecipeCMAXStub()
}

const makeLoadStepSpeedOvenById = (): LoadStepSpeedOvenById => {
  class StepSpeedOvenStub implements LoadStepSpeedOvenById {
    async loadStepSpeedOvenById (idRecipe: number): Promise<StepSpeedOvenModel> {
      return new Promise(resolve => resolve(mockReturnStepSpeedOven()))
    }
  }
  return new StepSpeedOvenStub()
}

const makeLoadStepCombiOvenTSI = (): LoadStepCombiOvenTSI => {
  class LoadStepCombiOvenTSIStub implements LoadStepCombiOvenTSI {
    async loadStepCombiOvenTSI (idRecipe: number): Promise<StepCombiOvenTSIModel[]> {
      return new Promise(resolve => resolve([mockReturnStepCombiOvenTSI()]))
    }
  }
  return new LoadStepCombiOvenTSIStub()
}

const makeLoadStepCombiOvenCMAX = (): LoadStepCombiOvenCMAX => {
  class LoadStepCombiOvenCMAXStub implements LoadStepCombiOvenCMAX {
    async loadStepCombiOvenCMAX (idRecipe: number): Promise<StepCombiOvenCMAXModel[]> {
      return new Promise(resolve => resolve([mockReturnStepCombiOvenCMAX()]))
    }
  }
  return new LoadStepCombiOvenCMAXStub()
}

interface SutTypes {
  sut: LoadMenuController
  menuValidationStub: Validation
  loadMenuByIdStub: LoadMenuById
  loadCompanyMenuConfigsStub: LoadCompanyMenuConfigs
  loadMenuGroupStub: LoadMenuGroup
  loadRecipeStub: LoadRecipe
  loadRecipeCMAXStub: LoadRecipeCMAX
  loadStepSpeedOvenByIdStub: LoadStepSpeedOvenById
  loadStepCombiOvenStub: LoadStepCombiOvenTSI
  loadStepCombiOvenCMAXStub: LoadStepCombiOvenCMAX
}

const makeSut = (): SutTypes => {
  const menuValidationStub = makeValidation()
  const loadMenuByIdStub = makeLoadMenuById()
  const loadCompanyMenuConfigsStub = makeLoadCompanyMenuConfigs()
  const loadMenuGroupStub = makeLoadMenuGroup()
  const loadRecipeStub = makeLoadRecipe()
  const loadRecipeCMAXStub = makeLoadRecipeCMAX()
  const loadStepSpeedOvenByIdStub = makeLoadStepSpeedOvenById()
  const loadStepCombiOvenStub = makeLoadStepCombiOvenTSI()
  const loadStepCombiOvenCMAXStub = makeLoadStepCombiOvenCMAX()

  const sut = new LoadMenuController(menuValidationStub, loadMenuByIdStub, loadCompanyMenuConfigsStub, loadMenuGroupStub, loadRecipeStub, loadRecipeCMAXStub, loadStepSpeedOvenByIdStub, loadStepCombiOvenStub, loadStepCombiOvenCMAXStub)
  return {
    sut,
    menuValidationStub,
    loadMenuByIdStub,
    loadCompanyMenuConfigsStub,
    loadMenuGroupStub,
    loadRecipeStub,
    loadRecipeCMAXStub,
    loadStepSpeedOvenByIdStub,
    loadStepCombiOvenStub,
    loadStepCombiOvenCMAXStub
  }
}

describe('LoadMenu Controller', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  test('Should call Validation with correct values', async () => {
    const { sut, menuValidationStub } = makeSut()
    const validateSpy = jest.spyOn(menuValidationStub, 'validate')
    const httpRequest = await mockLoadMenuIdRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, menuValidationStub } = makeSut()
    jest.spyOn(menuValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockLoadMenuIdRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call loadUserMenuStub with correct values', async () => {
    const { sut, loadMenuByIdStub } = makeSut()
    const addMenuSpy = jest.spyOn(loadMenuByIdStub, 'loadMenu')
    const httpRequest = await mockLoadMenuIdRequest()
    const { id } = httpRequest.params
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(id)
  })

  test('Should return 500 UpdateMenu throws', async () => {
    const { sut, loadMenuByIdStub } = makeSut()
    jest.spyOn(loadMenuByIdStub, 'loadMenu').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadMenuIdRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadMenuIdRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      menu: mockReturnMenuAll()
    }))
  })
})
