/* eslint-disable no-undef */
import { Validation } from './delete-step-SpeedOven-controller-protocols'
import { DeleteStepSpeedOvenController } from './delete-step-SpeedOven-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { DeleteStepSpeedOven } from '../../../domain/usecases/delete-step-SpeedOven'
import { MissingParamError } from '../../errors'
import { mockDeleteStepSpeedOvenRequest } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteStepSpeedOven = (): DeleteStepSpeedOven => {
  class DeleteStepSpeedOvenStub implements DeleteStepSpeedOven {
    async deleteStepSpeedOven (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteStepSpeedOvenStub()
}

interface SutTypes {
  sut: DeleteStepSpeedOvenController
  stepSpeedOvenValidationStub: Validation
  deleteStepSpeedOvenStub: DeleteStepSpeedOven
}

const makeSut = (): SutTypes => {
  const stepSpeedOvenValidationStub = makeValidation()
  const deleteStepSpeedOvenStub = makeDeleteStepSpeedOven()
  const sut = new DeleteStepSpeedOvenController(stepSpeedOvenValidationStub, deleteStepSpeedOvenStub)
  return {
    sut,
    stepSpeedOvenValidationStub,
    deleteStepSpeedOvenStub
  }
}

describe('DeleteStepSpeedOven Controller', () => {
  test('Should call Validation with the correct values', async () => {
    const { sut, stepSpeedOvenValidationStub } = makeSut()
    const validateSpy = jest.spyOn(stepSpeedOvenValidationStub, 'validate')
    const httpRequest = await mockDeleteStepSpeedOvenRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, stepSpeedOvenValidationStub } = makeSut()
    jest.spyOn(stepSpeedOvenValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
    const httpRequest = await mockDeleteStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should call deleteStepSpeedOven with correct values', async () => {
    const { sut, deleteStepSpeedOvenStub } = makeSut()
    const deleteStepSpeedOvenSpy = jest.spyOn(deleteStepSpeedOvenStub, 'deleteStepSpeedOven')
    const httpRequest = await mockDeleteStepSpeedOvenRequest()
    await sut.handle(httpRequest)
    expect(deleteStepSpeedOvenSpy).toHaveBeenCalledWith(httpRequest.params.id)
  })

  test('Should return 500 when deleteStepSpeedOven throws', async () => {
    const { sut, deleteStepSpeedOvenStub } = makeSut()
    jest.spyOn(deleteStepSpeedOvenStub, 'deleteStepSpeedOven').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockDeleteStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockDeleteStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
