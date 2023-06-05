/* eslint-disable no-undef */
import { ok, serverError } from '../../helpers/http-helper'
import { LoadStepCombiOvenCMAX } from './load-step-CombiOvenCMAX-controller-protocols'
import { StepCombiOvenCMAXModel } from '../../../domain/models/stepCombiOvenCMAX'
import { LoadStepCombiOvenCMAXController } from './load-step-CombiOvenCMAX-controller'
import { Validation } from '../../protocols'
import { connection } from '../../../main/config/app'
import env from '../../../main/config/env'
import mysql from 'mysql'
import express from 'express'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import { mockLoadStepCombiOvenCMAXRequest, mockReturnStepCombiOvenCMAX } from '../../../domain/mocks/menus'

const makeLoadStepCombiOvenCMAX = (): LoadStepCombiOvenCMAX => {
  class LoadStepCombiOvenCMAXStub implements LoadStepCombiOvenCMAX {
    loadStepCombiOvenCMAX (idRecipe: number): Promise<StepCombiOvenCMAXModel[]> {
      return new Promise(resolve => resolve([mockReturnStepCombiOvenCMAX()]))
    }
  }
  return new LoadStepCombiOvenCMAXStub()
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
  sut: LoadStepCombiOvenCMAXController
  loadStepCombiOvenCMAXStub: LoadStepCombiOvenCMAX
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadStepCombiOvenCMAXStub = makeLoadStepCombiOvenCMAX()
  const validationStub = makeValidation()
  const sut = new LoadStepCombiOvenCMAXController(loadStepCombiOvenCMAXStub, validationStub)
  return {
    sut,
    loadStepCombiOvenCMAXStub,
    validationStub
  }
}

describe('LoadStepCombiOvenCMAX Usecase', () => {
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
    const httpRequest = await mockLoadStepCombiOvenCMAXRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should call LoadStepCombiOvenCMAX with correct values', async () => {
    const { sut, loadStepCombiOvenCMAXStub } = makeSut()
    const loadSpy = jest.spyOn(loadStepCombiOvenCMAXStub, 'loadStepCombiOvenCMAX')
    const httpRequest = await mockLoadStepCombiOvenCMAXRequest()
    const { recipeId } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(recipeId)
  })

  test('Should return 500 if LoadStepCombiOvenCMAX throws', async () => {
    const { sut, loadStepCombiOvenCMAXStub } = makeSut()
    jest.spyOn(loadStepCombiOvenCMAXStub, 'loadStepCombiOvenCMAX').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      stepsCombiOvenCMAX: [mockReturnStepCombiOvenCMAX()]
    }))
  })
})
