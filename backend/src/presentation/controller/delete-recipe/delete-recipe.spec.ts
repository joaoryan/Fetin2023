/* eslint-disable no-undef */
import { Validation } from './delete-recipe-controller-protocols'
import { DeleteRecipeController } from './delete-recipe-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { DeleteRecipe } from '../../../domain/usecases/delete-recipe'
import { mockDeleteRecipeRequest } from '../../../domain/mocks/menus'
import { MissingParamError } from '../../errors'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteRecipe = (): DeleteRecipe => {
  class DeleteRecipeStub implements DeleteRecipe {
    async deleteRecipe (id: number, equipTypeId: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteRecipeStub()
}

interface SutTypes {
  sut: DeleteRecipeController
  recipeValidationStub: Validation
  deleteRecipeStub: DeleteRecipe
}

const makeSut = (): SutTypes => {
  const recipeValidationStub = makeValidation()
  const deleteRecipeStub = makeDeleteRecipe()
  const sut = new DeleteRecipeController(recipeValidationStub, deleteRecipeStub)
  return {
    sut,
    recipeValidationStub,
    deleteRecipeStub
  }
}

describe('DeleteRecipe Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, recipeValidationStub } = makeSut()
    const validateSpy = jest.spyOn(recipeValidationStub, 'validate')
    const httpRequest = await mockDeleteRecipeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith({ equipType: httpRequest.body.equipType, id: httpRequest.body.idArray[0] })
  })

  test('Should call deleteRecipe with correct values', async () => {
    const { sut, deleteRecipeStub } = makeSut()
    const deletRecipeSpy = jest.spyOn(deleteRecipeStub, 'deleteRecipe')
    const httpRequest = await mockDeleteRecipeRequest()
    await sut.handle(httpRequest)
    expect(deletRecipeSpy).toHaveBeenCalledWith(httpRequest.body.idArray[0], httpRequest.body.equipType)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, recipeValidationStub } = makeSut()
    jest.spyOn(recipeValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
    const httpRequest = await mockDeleteRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 500 deleteRecipe throws', async () => {
    const { sut, deleteRecipeStub } = makeSut()
    jest.spyOn(deleteRecipeStub, 'deleteRecipe').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockDeleteRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockDeleteRecipeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
