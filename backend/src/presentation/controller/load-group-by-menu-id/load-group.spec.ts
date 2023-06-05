/* eslint-disable no-undef */
import { Validation, LoadMenuGroup } from './load-group-controller-protocols'
import { LoadGroupController } from './load-group-controller'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { connection } from '../../../main/config/app'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import express from 'express'
import env from '../../../main/config/env'
import mysql from 'mysql'
import { MenuGroupModel } from '../../../domain/models/menu-group'
import { mockLoadGroupRequest, mockReturnGroup } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadMenuGroup = (): LoadMenuGroup => {
  class LoadMenuGroupStub implements LoadMenuGroup {
    loadMenuGroup (idMenu: number): Promise<MenuGroupModel[] | null> {
      return new Promise(resolve => resolve([mockReturnGroup()]))
    }
  }
  return new LoadMenuGroupStub()
}

interface SutTypes {
  sut: LoadGroupController
  groupValidationStub: Validation
  loadMenuGroupStub: LoadMenuGroup
}

const makeSut = (): SutTypes => {
  const groupValidationStub = makeValidation()
  const loadMenuGroupStub = makeLoadMenuGroup()

  const sut = new LoadGroupController(groupValidationStub, loadMenuGroupStub)
  return {
    sut,
    groupValidationStub,
    loadMenuGroupStub
  }
}

describe('LoadGroup Controller', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  test('Should call Validation with correct values', async () => {
    const { sut, groupValidationStub } = makeSut()
    const validateSpy = jest.spyOn(groupValidationStub, 'validate')
    const httpRequest = await mockLoadGroupRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should call loadMenuGroupStub with correct values', async () => {
    const { sut, loadMenuGroupStub } = makeSut()
    const addMenuSpy = jest.spyOn(loadMenuGroupStub, 'loadMenuGroup')
    const httpRequest = await mockLoadGroupRequest()
    const { menuId } = httpRequest.params
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(menuId)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, groupValidationStub } = makeSut()
    jest.spyOn(groupValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockLoadGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 500 loadMenu throws', async () => {
    const { sut, loadMenuGroupStub } = makeSut()
    jest.spyOn(loadMenuGroupStub, 'loadMenuGroup').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if loadMenuGroup returns null', async () => {
    const { sut, loadMenuGroupStub } = makeSut()
    jest.spyOn(loadMenuGroupStub, 'loadMenuGroup').mockImplementationOnce(() => new Promise(resolve => resolve(null)))
    const httpRequest = await mockLoadGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ groups: [mockReturnGroup()] }))
  })
})
