/* eslint-disable no-undef */
import { noContent, ok, serverError } from '../../helpers/http-helper'
// import { ok} from '../../helpers/http-helper'
import { LoadStepsSpeedOvenByRecipeId } from './load-step-SpeedOven-by-recipe-id-controller-protocols'
import { StepSpeedOvenModel } from '../../../domain/models/stepSpeedOven'
import { LoadStepsSpeedOvenByRecipeIdController } from './load-step-SpeedOven-by-recipe-id-controller'
import { Validation } from '../../protocols'
import { connection } from '../../../main/config/app'
import env from '../../../main/config/env'
import mysql from 'mysql'
import express from 'express'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import { mockLoadStepsSpeedOvenByRecipeIdRequest, mockReturnStepSpeedOven } from './../../../domain/mocks/menus'

const makeLoadStepsSpeedOvenByRecipeId = (): LoadStepsSpeedOvenByRecipeId => {
  class LoadStepsSpeedOvenByRecipeIdStub implements LoadStepsSpeedOvenByRecipeId {
    loadStepsSpeedOvenByRecipeId (idRecipe: number): Promise<StepSpeedOvenModel[] | null> {
      return new Promise(resolve => resolve([mockReturnStepSpeedOven()]))
    }
  }
  return new LoadStepsSpeedOvenByRecipeIdStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: LoadStepsSpeedOvenByRecipeIdController
  loadStepsSpeedOvenByRecipeIdStub: LoadStepsSpeedOvenByRecipeId
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadStepsSpeedOvenByRecipeIdStub = makeLoadStepsSpeedOvenByRecipeId()
  const validationStub = makeValidation()
  const sut = new LoadStepsSpeedOvenByRecipeIdController(loadStepsSpeedOvenByRecipeIdStub, validationStub)
  return {
    sut,
    loadStepsSpeedOvenByRecipeIdStub,
    validationStub
  }
}

describe('LoadStepSpeedOvenByRecipeId Usecase', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = await mockLoadStepsSpeedOvenByRecipeIdRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should call LoadStepSpeedOvenByRecipeId with correct values', async () => {
    const { sut, loadStepsSpeedOvenByRecipeIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadStepsSpeedOvenByRecipeIdStub, 'loadStepsSpeedOvenByRecipeId')
    const httpRequest = await mockLoadStepsSpeedOvenByRecipeIdRequest()
    const { recipeId } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(recipeId)
  })

  test('Should return 500 if LoadStepSPeedOvenByRecipeId throws', async () => {
    const { sut, loadStepsSpeedOvenByRecipeIdStub } = makeSut()
    jest.spyOn(loadStepsSpeedOvenByRecipeIdStub, 'loadStepsSpeedOvenByRecipeId').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadStepsSpeedOvenByRecipeIdRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 204 if LoadStepSpeedOvenByRecipeId returns null', async () => {
    const { sut, loadStepsSpeedOvenByRecipeIdStub } = makeSut()
    jest.spyOn(loadStepsSpeedOvenByRecipeIdStub, 'loadStepsSpeedOvenByRecipeId').mockImplementationOnce(() => new Promise(resolve => resolve(null)))
    const httpRequest = await mockLoadStepsSpeedOvenByRecipeIdRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadStepsSpeedOvenByRecipeIdRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      stepsSpeedOven: [mockReturnStepSpeedOven()]
    }))
  })
})
