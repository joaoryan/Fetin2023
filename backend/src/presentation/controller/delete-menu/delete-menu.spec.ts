/* eslint-disable no-undef */
import { Validation } from './delete-menu-controller-protocols'
import { DeleteMenuController } from './delete-menu-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { DeleteMenu } from '../../../domain/usecases/delete-menu'
import { mockDeleteMenuRequest } from '../../../domain/mocks/menus'
import { MissingParamError } from '../../errors'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteMenu = (): DeleteMenu => {
  class DeleteMenuStub implements DeleteMenu {
    deleteMenu (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteMenuStub()
}

interface SutTypes {
  sut: DeleteMenuController
  deleteMenuValidationStub: Validation
  deleteMenuStub: DeleteMenu
}

const makeSut = (): SutTypes => {
  const deleteMenuValidationStub = makeValidation()
  const deleteMenuStub = makeDeleteMenu()
  const sut = new DeleteMenuController(deleteMenuValidationStub, deleteMenuStub)
  return {
    sut,
    deleteMenuValidationStub,
    deleteMenuStub
  }
}

describe('DeleteMenu Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, deleteMenuValidationStub } = makeSut()
    const validateSpy = jest.spyOn(deleteMenuValidationStub, 'validate')
    const httpRequest = await mockDeleteMenuRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should call deleteMenuStub with correct values', async () => {
    const { sut, deleteMenuStub } = makeSut()
    const addMenuSpy = jest.spyOn(deleteMenuStub, 'deleteMenu')
    const httpRequest = await mockDeleteMenuRequest()
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.params.id)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, deleteMenuValidationStub } = makeSut()
    jest.spyOn(deleteMenuValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
    const httpResponse = await sut.handle({ params: { id: 'invalid' } })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 500 deleteMenu throws', async () => {
    const { sut, deleteMenuStub } = makeSut()
    jest.spyOn(deleteMenuStub, 'deleteMenu').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockDeleteMenuRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockDeleteMenuRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
