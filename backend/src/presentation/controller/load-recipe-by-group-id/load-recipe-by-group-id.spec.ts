/* eslint-disable no-undef */
import { LoadRecipe, Validation } from './load-recipe-by-group-id-controller-protocols'
import { LoadRecipeController } from './load-recipe-by-group-id-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { RecipeModel } from '../../../domain/models/recipe'
import { mockLoadRecipeRequest, mockReturnRecipe } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadRecipe = (): LoadRecipe => {
  class LoadRecipeStub implements LoadRecipe {
    loadRecipe (idGroup: number): Promise<RecipeModel[]> {
      return new Promise(resolve => resolve([mockReturnRecipe()]))
    }
  }
  return new LoadRecipeStub()
}

interface SutTypes {
  sut: LoadRecipeController
  recipeValidationStub: Validation
  loadRecipeStub: LoadRecipe
}

const makeSut = (): SutTypes => {
  const recipeValidationStub = makeValidation()
  const loadRecipeStub = makeLoadRecipe()

  const sut = new LoadRecipeController(recipeValidationStub, loadRecipeStub)
  return {
    sut,
    recipeValidationStub,
    loadRecipeStub
  }
}

describe('LoadRecipe Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, recipeValidationStub } = makeSut()
    const validateSpy = jest.spyOn(recipeValidationStub, 'validate')
    const httpRequest = await mockLoadRecipeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, recipeValidationStub } = makeSut()
    jest.spyOn(recipeValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockLoadRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call loadRecipeStub with correct values', async () => {
    const { sut, loadRecipeStub } = makeSut()
    const addMenuSpy = jest.spyOn(loadRecipeStub, 'loadRecipe')
    const httpRequest = await mockLoadRecipeRequest()
    const { id } = httpRequest.params
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(id)
  })

  test('Should return 500 loadRecipe throws', async () => {
    const { sut, loadRecipeStub } = makeSut()
    jest.spyOn(loadRecipeStub, 'loadRecipe').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const httpRequest = await mockLoadRecipeRequest()
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      recipes: [mockReturnRecipe()]
    }))
  })
})
