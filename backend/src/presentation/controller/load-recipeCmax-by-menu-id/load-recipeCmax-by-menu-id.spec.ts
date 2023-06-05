/* eslint-disable no-undef */
import { Validation, LoadRecipeCMAX } from './load-recipeCmax-by-menu-id-controller-protocols'
import { LoadRecipeCmaxController } from './load-recipeCmax-by-menu-id-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { RecipeCMAXModel } from '../../../domain/models/recipeCMAX'
import { mockLoadRecipeCmaxRequest, mockReturnRecipeCmax } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadRecipeCMAX = (): LoadRecipeCMAX => {
  class LoadRecipeCMAXStub implements LoadRecipeCMAX {
    loadRecipeCMAX (idMenu: number): Promise<RecipeCMAXModel[]> {
      return new Promise(resolve => resolve([mockReturnRecipeCmax()]))
    }
  }
  return new LoadRecipeCMAXStub()
}

interface SutTypes {
  sut: LoadRecipeCmaxController
  recipeValidationStub: Validation
  loadRecipeCMAXStub: LoadRecipeCMAX
}

const makeSut = (): SutTypes => {
  const recipeValidationStub = makeValidation()
  const loadRecipeCMAXStub = makeLoadRecipeCMAX()

  const sut = new LoadRecipeCmaxController(recipeValidationStub, loadRecipeCMAXStub)
  return {
    sut,
    recipeValidationStub,
    loadRecipeCMAXStub
  }
}

describe('LoadRecipeCmax Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, recipeValidationStub } = makeSut()
    const validateSpy = jest.spyOn(recipeValidationStub, 'validate')
    const httpRequest = await mockLoadRecipeCmaxRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, recipeValidationStub } = makeSut()
    jest.spyOn(recipeValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockLoadRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call loadRecipeStub with correct values', async () => {
    const { sut, loadRecipeCMAXStub } = makeSut()
    const addMenuSpy = jest.spyOn(loadRecipeCMAXStub, 'loadRecipeCMAX')
    const httpRequest = await mockLoadRecipeCmaxRequest()
    const { id } = httpRequest.params
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(id)
  })

  test('Should return 500 loadRecipe throws', async () => {
    const { sut, loadRecipeCMAXStub } = makeSut()
    jest.spyOn(loadRecipeCMAXStub, 'loadRecipeCMAX').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      recipes: [mockReturnRecipeCmax()]
    }))
  })
})
