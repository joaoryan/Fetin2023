/* eslint-disable no-undef */
import { Validation } from './delete-step-CombiOvenCMAX-controller-protocols'
import { DeleteStepCombiOvenCMAXController } from './delete-step-CombiOvenCMAX-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { DeleteStepCombiOvenCMAX } from '../../../domain/usecases/delete-step-CombiOvenCMAX'
import { MissingParamError } from '../../errors'
import { mockDeleteStepCombiOvenCMAXRequest } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteStepCombiOvenCMAX = (): DeleteStepCombiOvenCMAX => {
  class DeleteStepCombiOvenCMAXStub implements DeleteStepCombiOvenCMAX {
    async deleteStepCombiOvenCMAX (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteStepCombiOvenCMAXStub()
}

interface SutTypes {
  sut: DeleteStepCombiOvenCMAXController
  stepCombiOvenCMAXValidationStub: Validation
  deleteStepCombiOvenCMAXStub: DeleteStepCombiOvenCMAX
}

const makeSut = (): SutTypes => {
  const stepCombiOvenCMAXValidationStub = makeValidation()
  const deleteStepCombiOvenCMAXStub = makeDeleteStepCombiOvenCMAX()
  const sut = new DeleteStepCombiOvenCMAXController(stepCombiOvenCMAXValidationStub, deleteStepCombiOvenCMAXStub)
  return {
    sut,
    stepCombiOvenCMAXValidationStub,
    deleteStepCombiOvenCMAXStub
  }
}

describe('DeleteStepCombiOvenCMAX Controller', () => {
  test('Should call Validation with the correct values', async () => {
    const { sut, stepCombiOvenCMAXValidationStub } = makeSut()
    const validateSpy = jest.spyOn(stepCombiOvenCMAXValidationStub, 'validate')
    const httpRequest = await mockDeleteStepCombiOvenCMAXRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, stepCombiOvenCMAXValidationStub } = makeSut()
    jest.spyOn(stepCombiOvenCMAXValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
    const httpRequest = await mockDeleteStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should call deleteStepCombiOvenCMAX with correct values', async () => {
    const { sut, deleteStepCombiOvenCMAXStub } = makeSut()
    const deleteStepCombiOvenCMAXSpy = jest.spyOn(deleteStepCombiOvenCMAXStub, 'deleteStepCombiOvenCMAX')
    const httpRequest = await mockDeleteStepCombiOvenCMAXRequest()
    await sut.handle(httpRequest)
    expect(deleteStepCombiOvenCMAXSpy).toHaveBeenCalledWith(httpRequest.params.id)
  })

  test('Should return 500 when deleteStepCombiOvenCMAX throws', async () => {
    const { sut, deleteStepCombiOvenCMAXStub } = makeSut()
    jest.spyOn(deleteStepCombiOvenCMAXStub, 'deleteStepCombiOvenCMAX').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockDeleteStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockDeleteStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
