/* eslint-disable no-undef */
import { Validation } from './Update-menu-controller-protocols'
import { UpdateMenuController } from './Update-menu-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateMenuModel, UpdateMenu } from '../../../domain/usecases/Update-menu'
import { UpdateMenuConfigs, UpdateMenuConfigsModel } from '../../../domain/usecases/Update-menu-configs'
import { mockUpdateMenuRequest } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeUpdateMenu = (): UpdateMenu => {
  class UpdateMenuStub implements UpdateMenu {
    updateMenu (menu: UpdateMenuModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateMenuStub()
}

const makeUpdateMenuConfigs = (): UpdateMenuConfigs => {
  class UpdateMenuConfigsStub implements UpdateMenuConfigs {
    async updateMenuConfigs (menuConfigs: UpdateMenuConfigsModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateMenuConfigsStub()
}

interface SutTypes {
  sut: UpdateMenuController
  menuValidationStub: Validation
  menuConfigValidationStub: Validation
  UpdateMenuStub: UpdateMenu
  UpdateMenuConfigsStub: UpdateMenuConfigs
}

const makeSut = (): SutTypes => {
  const menuValidationStub = makeValidation()
  const menuConfigValidationStub = makeValidation()
  const UpdateMenuStub = makeUpdateMenu()
  const UpdateMenuConfigsStub = makeUpdateMenuConfigs()
  const sut = new UpdateMenuController(menuValidationStub, menuConfigValidationStub, UpdateMenuStub, UpdateMenuConfigsStub)
  return {
    sut,
    menuValidationStub,
    menuConfigValidationStub,
    UpdateMenuStub,
    UpdateMenuConfigsStub
  }
}

describe('UpdateMenu Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, menuValidationStub } = makeSut()
    const validateSpy = jest.spyOn(menuValidationStub, 'validate')
    const httpRequest = await mockUpdateMenuRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.menu)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, menuValidationStub } = makeSut()
    jest.spyOn(menuValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockUpdateMenuRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call UpdateMenuStub with correct values', async () => {
    const { sut, UpdateMenuStub } = makeSut()
    const addMenuSpy = jest.spyOn(UpdateMenuStub, 'updateMenu')
    const httpRequest = await mockUpdateMenuRequest()
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.body.menu)
  })

  test('Should return 500 UpdateMenu throws', async () => {
    const { sut, UpdateMenuStub } = makeSut()
    jest.spyOn(UpdateMenuStub, 'updateMenu').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockUpdateMenuRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockUpdateMenuRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
