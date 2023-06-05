/* eslint-disable no-undef */
import { LoadEquipByMenuController } from './load-equip-by-menu-controller'
import { HttpRequest, LoadEquipByMenu, Validation } from './load-user-menu-controller-protocols'
import { ok, serverError } from '../../helpers/http-helper'
import { EquipModel } from '../../../domain/models/equipment'
import { connection } from '../../../main/config/app'
import mysql from 'mysql'
import env from '../../../main/config/env'
import express from 'express'
import setUpRoutes from '../../../main/config/routes'
import setUpMiddlewares from '../../../main/config/middlewares'
import { mockEquipModel } from '../../../domain/mocks/equipment'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    idMenu: 1
  }
})

const makeLoadEquipByMenu = (): LoadEquipByMenu => {
  class LoadEquipByMenuStub implements LoadEquipByMenu {
    loadEquip (menuId: number): Promise<EquipModel[] | null> {
      return new Promise(resolve => resolve([mockEquipModel()]))
    }
  }
  return new LoadEquipByMenuStub()
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
  sut: LoadEquipByMenuController
  userValidationStub: Validation
  loadEquipByMenuStub: LoadEquipByMenu
}

const makeSut = (): SutTypes => {
  const userValidationStub = makeValidation()
  const loadEquipByMenuStub = makeLoadEquipByMenu()
  const sut = new LoadEquipByMenuController(userValidationStub, loadEquipByMenuStub)
  return {
    sut,
    userValidationStub,
    loadEquipByMenuStub
  }
}

describe('LoadEquipByMenu Controller', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
    jest.setTimeout(5 * 1000)
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  test('Should call loadEquipByMenuStub with correct values', async () => {
    const { sut, loadEquipByMenuStub } = makeSut()
    const loadEquipByMenuSpy = jest.spyOn(loadEquipByMenuStub, 'loadEquip')
    const httpRequest = makeFakeRequest()
    const { idMenu } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadEquipByMenuSpy).toHaveBeenCalledWith(idMenu)
  })

  test('Should return 500 UpdateMenu throws', async () => {
    const { sut, loadEquipByMenuStub } = makeSut()
    jest.spyOn(loadEquipByMenuStub, 'loadEquip').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const makeFakeRequestTest = (): HttpRequest => ({
      params: {
        idMenu: 1
      }
    })
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequestTest())
    expect(httpResponse).toEqual(ok({
      equipment: [mockEquipModel()]
    }))
  })
})
