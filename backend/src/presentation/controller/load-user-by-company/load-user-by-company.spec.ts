/* eslint-disable no-undef */
import { Validation } from '../../protocols'
import { LoadUserByCompany } from '../../../domain/usecases/load-user-by-company'
import { LoadUserByCompanyController } from './load-user-by-company-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { connection } from '../../../main/config/app'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import express from 'express'
import env from '../../../main/config/env'
import mysql from 'mysql'
import { UserModel } from '../../../domain/models/user'
import { mockLoadUserRequest, mockReturnUser } from '../../../domain/mocks/user'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

class LoadUserByCompanyStub implements LoadUserByCompany {
  loadUser (id: number): Promise<UserModel[] | null> {
    return new Promise(resolve => resolve([mockReturnUser()]))
  }
}

interface SutTypes {
  sut: LoadUserByCompanyController
  validationStub: Validation
  loadUserByCompanyStub: LoadUserByCompany
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const loadUserByCompanyStub = new LoadUserByCompanyStub()

  const sut = new LoadUserByCompanyController(validationStub, loadUserByCompanyStub)
  return {
    sut,
    validationStub,
    loadUserByCompanyStub
  }
}

describe('LoadUserByCompany Controller', () => {
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
    const httpRequest = await mockLoadUserRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockLoadUserRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call loadUserByCompanyStub with correct values', async () => {
    const { sut, loadUserByCompanyStub } = makeSut()
    const loadRecipeSpy = jest.spyOn(loadUserByCompanyStub, 'loadUser')
    const httpRequest = await mockLoadUserRequest()
    const { id } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadRecipeSpy).toHaveBeenCalledWith(id)
  })

  test('Should return 500 loadUserByCompany throws', async () => {
    const { sut, loadUserByCompanyStub } = makeSut()
    jest.spyOn(loadUserByCompanyStub, 'loadUser').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadUserRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadUserRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      users: [mockReturnUser()]
    }))
  })
})
