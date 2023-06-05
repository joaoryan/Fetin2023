/* eslint-disable no-undef */
import { Validation } from './add-menu-controller-protocols'
import { AddMenuController } from './add-menu-controller'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { AddMenuModel, AddMenu } from '../../../domain/usecases/add-menu'
import { MenuModel } from '../../../domain/models/menu'
import { AddMenuConfigs, AddMenuConfigsModel } from '../../../domain/usecases/add-menu-configs'
import { mockAddMenuRequest, mockReturnMenu } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddMenu = (): AddMenu => {
  class AddMenuStub implements AddMenu {
    async add (menu: AddMenuModel): Promise<MenuModel> {
      return new Promise(resolve => resolve(mockReturnMenu()))
    }
  }
  return new AddMenuStub()
}

const makeAddMenuConfigs = (): AddMenuConfigs => {
  class AddMenuConfigsStub implements AddMenuConfigs {
    async addConfigs (account: AddMenuConfigsModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddMenuConfigsStub()
}

interface SutTypes {
  sut: AddMenuController
  menuValidationStub: Validation
  menuConfigValidationStub: Validation
  addMenuStub: AddMenu
  addMenuConfigsStub: AddMenuConfigs
}

const makeSut = (): SutTypes => {
  const menuValidationStub = makeValidation()
  const menuConfigValidationStub = makeValidation()
  const addMenuStub = makeAddMenu()
  const addMenuConfigsStub = makeAddMenuConfigs()
  const sut = new AddMenuController(menuValidationStub, menuConfigValidationStub, addMenuStub, addMenuConfigsStub)
  return {
    sut,
    menuValidationStub,
    menuConfigValidationStub,
    addMenuStub,
    addMenuConfigsStub
  }
}

describe('AddMenu Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, menuValidationStub } = makeSut()
    const validateSpy = jest.spyOn(menuValidationStub, 'validate')
    const httpRequest = await mockAddMenuRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.menu)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, menuValidationStub } = makeSut()
    jest.spyOn(menuValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockAddMenuRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddMenu with correct values', async () => {
    const { sut, addMenuStub } = makeSut()
    const addMenuSpy = jest.spyOn(addMenuStub, 'add')
    const httpRequest = await mockAddMenuRequest()

    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.body.menu)
  })

  test('Should return 500 AddMenu throws', async () => {
    const { sut, addMenuStub } = makeSut()
    jest.spyOn(addMenuStub, 'add').mockImplementationOnce(() => { throw new Error() })

    const httpRequest = await mockAddMenuRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockAddMenuRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created(mockReturnMenu()))
  })
})
