/* eslint-disable no-undef */
import { LoadRecipeCookbook, Validation } from './load-recipe-cookbook-controller-protocols'
import { LoadRecipeCookbookController } from './load-recipe-cookbook-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { connection } from '../../../main/config/app'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import express from 'express'
import env from '../../../main/config/env'
import mysql from 'mysql'
import { RecipeCookbookModel } from '../../../domain/models/recipe-cookbook'
import { mockLoadCookbookRequest, mockReturnCookbook } from '../../../domain/mocks/cookbook'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadRecipeCookbook = (): LoadRecipeCookbook => {
  class LoadRecipeCookbookStub implements LoadRecipeCookbook {
    loadRecipeCookbook (idCompany: number | null): Promise<RecipeCookbookModel[]> {
      return new Promise(resolve => resolve([mockReturnCookbook()]))
    }
  }
  return new LoadRecipeCookbookStub()
}

interface SutTypes {
  sut: LoadRecipeCookbookController
  recipeValidationStub: Validation
  loadRecipeCookbookStub: LoadRecipeCookbook
}

const makeSut = (): SutTypes => {
  const recipeValidationStub = makeValidation()
  const loadRecipeCookbookStub = makeLoadRecipeCookbook()

  const sut = new LoadRecipeCookbookController(recipeValidationStub, loadRecipeCookbookStub)
  return {
    sut,
    recipeValidationStub,
    loadRecipeCookbookStub
  }
}

describe('LoadRecipeCookbook Controller', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  test('Should call Validation with correct values', async () => {
    const { sut, recipeValidationStub } = makeSut()
    const validateSpy = jest.spyOn(recipeValidationStub, 'validate')
    const httpRequest = await mockLoadCookbookRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, recipeValidationStub } = makeSut()
    jest.spyOn(recipeValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockLoadCookbookRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call loadRecipeStub with correct values', async () => {
    const { sut, loadRecipeCookbookStub } = makeSut()
    const loadRecipeSpy = jest.spyOn(loadRecipeCookbookStub, 'loadRecipeCookbook')
    const httpRequest = await mockLoadCookbookRequest()
    const { id } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadRecipeSpy).toHaveBeenCalledWith(id)
  })

  test('Should return 500 loadRecipeCookbook throws', async () => {
    const { sut, loadRecipeCookbookStub } = makeSut()
    jest.spyOn(loadRecipeCookbookStub, 'loadRecipeCookbook').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadCookbookRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadCookbookRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      recipes: [mockReturnCookbook()]
    }))
  })
})
