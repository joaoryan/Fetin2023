/* eslint-disable no-undef */
import { Validation } from './add-recipe-controller-protocols'
import { AddRecipeController } from './add-recipe-controller'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { AddRecipeModel, AddRecipe } from '../../../domain/usecases/add-recipe'
import { AddRecipeCMAXModel, AddRecipeCMAX } from '../../../domain/usecases/add-recipeCMAX'
import { RecipeModel } from '../../../domain/models/recipe'
import { RecipeCMAXModel } from '../../../domain/models/recipeCMAX'
import { mockAddRecipeCmaxRequest, mockAddRecipeRequest, mockReturnRecipe, mockReturnRecipeCmax } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddRecipe = (): AddRecipe => {
  class AddRecipeStub implements AddRecipe {
    async addRecipe (recipe: AddRecipeModel): Promise<RecipeModel | null> {
      return new Promise(resolve => resolve(mockReturnRecipe()))
    }
  }
  return new AddRecipeStub()
}

const makeAddRecipeCMAX = (): AddRecipeCMAX => {
  class AddRecipeCMAXStub implements AddRecipeCMAX {
    async addRecipeCMAX (recipe: AddRecipeCMAXModel): Promise<RecipeCMAXModel | null> {
      return new Promise(resolve => resolve(mockReturnRecipeCmax()))
    }
  }
  return new AddRecipeCMAXStub()
}

interface SutTypes {
  sut: AddRecipeController
  recipeValidationStub: Validation
  recipeCmaxValidationStub: Validation
  addRecipeStub: AddRecipe
  addRecipeCMAXStub: AddRecipeCMAX
}

const makeSut = (): SutTypes => {
  const recipeValidationStub = makeValidation()
  const recipeCmaxValidationStub = makeValidation()
  const addRecipeStub = makeAddRecipe()
  const addRecipeCMAXStub = makeAddRecipeCMAX()
  const sut = new AddRecipeController(recipeValidationStub, recipeCmaxValidationStub, addRecipeStub, addRecipeCMAXStub)
  return {
    sut,
    recipeValidationStub,
    recipeCmaxValidationStub,
    addRecipeStub,
    addRecipeCMAXStub
  }
}

describe('AddRecipe Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, recipeValidationStub } = makeSut()
    const validateSpy = jest.spyOn(recipeValidationStub, 'validate')
    const httpRequest = await mockAddRecipeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.recipe[0])
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, recipeValidationStub } = makeSut()
    jest.spyOn(recipeValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockAddRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddRecipe with correct values', async () => {
    const { sut, addRecipeStub } = makeSut()
    const addMenuSpy = jest.spyOn(addRecipeStub, 'addRecipe')
    const httpRequest = await mockAddRecipeRequest()
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.body.recipe[0])
  })

  test('Should return 500 AddRecipe throws', async () => {
    const { sut, addRecipeStub } = makeSut()
    jest.spyOn(addRecipeStub, 'addRecipe').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockAddRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockAddRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created<RecipeModel[]>([mockReturnRecipe()]))
  })
})

describe('AddRecipeCMAX Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, recipeCmaxValidationStub } = makeSut()
    const validateSpy = jest.spyOn(recipeCmaxValidationStub, 'validate')
    const httpRequest = await mockAddRecipeCmaxRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.recipe[0])
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, recipeCmaxValidationStub } = makeSut()
    jest.spyOn(recipeCmaxValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockAddRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call addRecipeCmax with correct values', async () => {
    const { sut, addRecipeCMAXStub } = makeSut()
    const addSpy = jest.spyOn(addRecipeCMAXStub, 'addRecipeCMAX')
    const httpRequest = await mockAddRecipeCmaxRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body.recipe[0])
  })

  test('Should return 500 addRecipeCmax throws', async () => {
    const { sut, addRecipeCMAXStub } = makeSut()
    jest.spyOn(addRecipeCMAXStub, 'addRecipeCMAX').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockAddRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockAddRecipeCmaxRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created<RecipeCMAXModel[]>([mockReturnRecipeCmax()]))
  })
})
