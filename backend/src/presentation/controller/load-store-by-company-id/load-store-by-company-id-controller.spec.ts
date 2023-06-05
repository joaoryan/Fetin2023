/* eslint-disable no-undef */
import { noContent, ok, serverError } from '../../helpers/http-helper'
import { LoadStoresByCompanyId } from './load-store-by-company-id-controller-protocols'
import { StoreModel } from '../../../domain/models/store'
import { LoadStoresByCompanyIdController } from './load-store-by-company-id-controller'
import { Validation } from '../../protocols'
import { connection } from '../../../main/config/app'
import env from '../../../main/config/env'
import mysql from 'mysql'
import express from 'express'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import { mockLoadStoresByCompanyIdRequest, mockLoadStoresByCompanyIdResponse } from '../../../domain/mocks/store'

const makeLoadStoresByCompanyId = (): LoadStoresByCompanyId => {
  class LoadStoresByCompanyIdStub implements LoadStoresByCompanyId {
    loadStoresByCompanyId (companyId: number, userId: number, userPrivilegeUser: string): Promise<StoreModel[] | null> {
      return new Promise(resolve => resolve(mockLoadStoresByCompanyIdResponse()))
    }
  }
  return new LoadStoresByCompanyIdStub()
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
  sut: LoadStoresByCompanyIdController
  loadStoresByCompanyIdStub: LoadStoresByCompanyId
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadStoresByCompanyIdStub = makeLoadStoresByCompanyId()
  const validationStub = makeValidation()
  const sut = new LoadStoresByCompanyIdController(loadStoresByCompanyIdStub, validationStub)
  return {
    sut,
    loadStoresByCompanyIdStub,
    validationStub
  }
}

describe('LoadStoreByCompanyId Usecase', () => {
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
    const httpRequest = mockLoadStoresByCompanyIdRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should call LoadStoreByCompanyId with correct values', async () => {
    const { sut, loadStoresByCompanyIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadStoresByCompanyIdStub, 'loadStoresByCompanyId')
    await sut.handle(mockLoadStoresByCompanyIdRequest())
    expect(loadSpy).toHaveBeenCalledWith(1, 1, 'admCli')
  })

  test('Should return 500 if LoadStoreByCompanyId throws', async () => {
    const { sut, loadStoresByCompanyIdStub } = makeSut()
    jest.spyOn(loadStoresByCompanyIdStub, 'loadStoresByCompanyId').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(mockLoadStoresByCompanyIdRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 204 if LoadStoreByCompanyId returns null', async () => {
    const { sut, loadStoresByCompanyIdStub } = makeSut()
    jest.spyOn(loadStoresByCompanyIdStub, 'loadStoresByCompanyId').mockImplementationOnce(() => new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockLoadStoresByCompanyIdRequest())
    expect(httpResponse).toEqual(noContent())
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockLoadStoresByCompanyIdRequest())
    expect(httpResponse).toEqual(ok({
      stores: mockLoadStoresByCompanyIdResponse()
    }))
  })
})
