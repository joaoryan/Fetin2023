/* eslint-disable no-undef */
import { Validation } from './delete-step-CombiOvenTSI-controller-protocols'
import { DeleteStepCombiOvenTSIController } from './delete-step-CombiOvenTSI-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { DeleteStepCombiOvenTSI } from '../../../domain/usecases/delete-step-CombiOvenTSI'
import { MissingParamError } from '../../errors'
import { mockDeleteStepCombiOvenTSIRequest } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteStepCombiOvenTSI = (): DeleteStepCombiOvenTSI => {
  class DeleteStepCombiOvenTSIStub implements DeleteStepCombiOvenTSI {
    async deleteStepCombiOvenTSI (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteStepCombiOvenTSIStub()
}

interface SutTypes {
  sut: DeleteStepCombiOvenTSIController
  stepCombiOvenTSIValidationStub: Validation
  deleteStepCombiOvenTSIStub: DeleteStepCombiOvenTSI
}

const makeSut = (): SutTypes => {
  const stepCombiOvenTSIValidationStub = makeValidation()
  const deleteStepCombiOvenTSIStub = makeDeleteStepCombiOvenTSI()
  const sut = new DeleteStepCombiOvenTSIController(stepCombiOvenTSIValidationStub, deleteStepCombiOvenTSIStub)
  return {
    sut,
    stepCombiOvenTSIValidationStub,
    deleteStepCombiOvenTSIStub
  }
}

describe('DeleteStepCombiOvenTSI Controller', () => {
  test('Should call Validation with the correct values', async () => {
    const { sut, stepCombiOvenTSIValidationStub } = makeSut()
    const validateSpy = jest.spyOn(stepCombiOvenTSIValidationStub, 'validate')
    const httpRequest = await mockDeleteStepCombiOvenTSIRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, stepCombiOvenTSIValidationStub } = makeSut()
    jest.spyOn(stepCombiOvenTSIValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
    const httpRequest = await mockDeleteStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should call deleteStepCombiOvenTSI with correct values', async () => {
    const { sut, deleteStepCombiOvenTSIStub } = makeSut()
    const deleteStepCombiOvenTSISpy = jest.spyOn(deleteStepCombiOvenTSIStub, 'deleteStepCombiOvenTSI')
    const httpRequest = await mockDeleteStepCombiOvenTSIRequest()
    await sut.handle(httpRequest)
    expect(deleteStepCombiOvenTSISpy).toHaveBeenCalledWith(httpRequest.params.id)
  })

  test('Should return 500 when deleteStepCombiOvenTSI throws', async () => {
    const { sut, deleteStepCombiOvenTSIStub } = makeSut()
    jest.spyOn(deleteStepCombiOvenTSIStub, 'deleteStepCombiOvenTSI').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockDeleteStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockDeleteStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
