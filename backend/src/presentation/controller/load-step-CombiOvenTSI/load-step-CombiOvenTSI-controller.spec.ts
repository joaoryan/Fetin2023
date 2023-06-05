/* eslint-disable no-undef */
import { ok, serverError } from '../../helpers/http-helper'
import { LoadStepCombiOvenTSI } from './load-step-CombiOvenTSI-controller-protocols'
import { StepCombiOvenTSIModel } from '../../../domain/models/stepCombiOvenTSI'
import { LoadStepCombiOvenTSIController } from './load-step-CombiOvenTSI-controller'
import { Validation } from '../../protocols'
import { connection } from '../../../main/config/app'
import env from '../../../main/config/env'
import mysql from 'mysql'
import express from 'express'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import { mockLoadStepCombiOvenTSIRequest, mockReturnStepCombiOvenTSI } from '../../../domain/mocks/menus'

const makeLoadStepCombiOvenTSI = (): LoadStepCombiOvenTSI => {
  class LoadStepCombiOvenTSIStub implements LoadStepCombiOvenTSI {
    loadStepCombiOvenTSI (idRecipe: number): Promise<StepCombiOvenTSIModel[]> {
      return new Promise(resolve => resolve([mockReturnStepCombiOvenTSI()]))
    }
  }
  return new LoadStepCombiOvenTSIStub()
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
  sut: LoadStepCombiOvenTSIController
  loadStepCombiOvenTSIStub: LoadStepCombiOvenTSI
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadStepCombiOvenTSIStub = makeLoadStepCombiOvenTSI()
  const validationStub = makeValidation()
  const sut = new LoadStepCombiOvenTSIController(loadStepCombiOvenTSIStub, validationStub)
  return {
    sut,
    loadStepCombiOvenTSIStub,
    validationStub
  }
}

describe('LoadStepCombiOvenTSI Usecase', () => {
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
    const httpRequest = await mockLoadStepCombiOvenTSIRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should call LoadStepCombiOvenTSI with correct values', async () => {
    const { sut, loadStepCombiOvenTSIStub } = makeSut()
    const loadSpy = jest.spyOn(loadStepCombiOvenTSIStub, 'loadStepCombiOvenTSI')
    const httpRequest = await mockLoadStepCombiOvenTSIRequest()
    const { recipeId } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(recipeId)
  })

  test('Should return 500 if LoadStepCombiOvenTSI throws', async () => {
    const { sut, loadStepCombiOvenTSIStub } = makeSut()
    jest.spyOn(loadStepCombiOvenTSIStub, 'loadStepCombiOvenTSI').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      stepsCombiOvenTSI: [mockReturnStepCombiOvenTSI()]
    }))
  })
})
