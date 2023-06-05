/* eslint-disable no-undef */
import { Validation } from './Update-recipe-controller-protocols'
import { UpdateRecipeController } from './Update-recipe-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateRecipe, UpdateRecipeModel } from '../../../domain/usecases/Update-recipe'
import { UpdateRecipeCMAX, UpdateRecipeCmaxModel } from '../../../domain/usecases/Update-recipeCMAX'
import { RecipeModel } from '../../../domain/models/recipe'
import { RecipeCMAXModel } from '../../../domain/models/recipeCMAX'
import { mockReturnRecipe, mockReturnRecipeCmax, mockUpdateRecipeCmaxRequest, mockUpdateRecipeRequest } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeUpdateRecipe = (): UpdateRecipe => {
  class UpdateRecipeStub implements UpdateRecipe {
    updateRecipe (recipe: UpdateRecipeModel): Promise<RecipeModel> {
      return new Promise(resolve => resolve(mockReturnRecipe()))
    }
  }
  return new UpdateRecipeStub()
}

const makeUpdateRecipeCMAX = (): UpdateRecipeCMAX => {
  class UpdateRecipeCMAXStub implements UpdateRecipeCMAX {
    async updateRecipeCMAX (recipe: UpdateRecipeCmaxModel): Promise<RecipeCMAXModel> {
      return new Promise(resolve => resolve(mockReturnRecipeCmax()))
    }
  }
  return new UpdateRecipeCMAXStub()
}

interface SutTypes {
  sut: UpdateRecipeController
  recipeValidationStub: Validation
  recipeCmaxValidationStub: Validation
  UpdateRecipeStub: UpdateRecipe
  UpdateRecipeCMAXStub: UpdateRecipeCMAX
}

const makeSut = (): SutTypes => {
  const recipeValidationStub = makeValidation()
  const recipeCmaxValidationStub = makeValidation()
  const UpdateRecipeStub = makeUpdateRecipe()
  const UpdateRecipeCMAXStub = makeUpdateRecipeCMAX()
  const sut = new UpdateRecipeController(recipeValidationStub, recipeCmaxValidationStub, UpdateRecipeStub, UpdateRecipeCMAXStub)
  return {
    sut,
    recipeValidationStub,
    recipeCmaxValidationStub,
    UpdateRecipeStub,
    UpdateRecipeCMAXStub
  }
}

describe('UpdateRecipe Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, recipeValidationStub } = makeSut()
    const validateSpy = jest.spyOn(recipeValidationStub, 'validate')
    const httpRequest = await mockUpdateRecipeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.recipe)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, recipeValidationStub } = makeSut()
    jest.spyOn(recipeValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockUpdateRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call UpdateRecipe with correct values', async () => {
    const { sut, UpdateRecipeStub } = makeSut()
    const addMenuSpy = jest.spyOn(UpdateRecipeStub, 'updateRecipe')
    const httpRequest = await mockUpdateRecipeRequest()
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.body.recipe)
  })

  test('Should return 500 UpdateRecipe throws', async () => {
    const { sut, UpdateRecipeStub } = makeSut()
    jest.spyOn(UpdateRecipeStub, 'updateRecipe').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockUpdateRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockUpdateRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})

describe('UpdateRecipeCMAX Controller', () => {
  test('Should call Validation with correct values(CMAX)', async () => {
    const { sut, recipeCmaxValidationStub } = makeSut()
    const validateSpy = jest.spyOn(recipeCmaxValidationStub, 'validate')
    const httpRequest = await mockUpdateRecipeCmaxRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.recipe)
  })

  test('Should return 400 if Validation fails(CMAX)', async () => {
    const { sut, recipeCmaxValidationStub } = makeSut()
    jest.spyOn(recipeCmaxValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockUpdateRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call UpdateRecipeCMAX with correct values(CMAX)', async () => {
    const { sut, UpdateRecipeCMAXStub } = makeSut()
    const addMenuSpy = jest.spyOn(UpdateRecipeCMAXStub, 'updateRecipeCMAX')
    const httpRequest = await mockUpdateRecipeCmaxRequest()
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.body.recipe)
  })

  test('Should return 500 UpdateRecipeCMAX throws(CMAX)', async () => {
    const { sut, UpdateRecipeCMAXStub } = makeSut()
    jest.spyOn(UpdateRecipeCMAXStub, 'updateRecipeCMAX').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockUpdateRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success(CMAX)', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockUpdateRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
