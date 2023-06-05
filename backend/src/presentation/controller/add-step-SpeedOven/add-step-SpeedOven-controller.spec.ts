/* eslint-disable no-undef */
import { Validation } from './add-step-SpeedOven-controller-protocols'
import { AddStepSpeedOvenController } from './add-step-SpeedOven-controller'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { AddStepSpeedOvenModel, AddStepSpeedOven } from '../../../domain/usecases/add-step-SpeedOven'
import { StepSpeedOvenModel } from '../../../domain/models/stepSpeedOven'
import { mockAddStepSpeedOvenRequest, mockReturnStepSpeedOven } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddStepSpeedOven = (): AddStepSpeedOven => {
  class AddStepSpeedOvenStub implements AddStepSpeedOven {
    async addStepSpeedOven (stepSpeedOven: AddStepSpeedOvenModel): Promise<StepSpeedOvenModel | null> {
      return mockReturnStepSpeedOven()
    }
  }
  return new AddStepSpeedOvenStub()
}

interface SutTypes {
  sut: AddStepSpeedOvenController
  stepSpeedOvenValidationStub: Validation
  addStepSpeedOvenStub: AddStepSpeedOven
}

const makeSut = (): SutTypes => {
  const stepSpeedOvenValidationStub = makeValidation()
  const addStepSpeedOvenStub = makeAddStepSpeedOven()
  const sut = new AddStepSpeedOvenController(stepSpeedOvenValidationStub, addStepSpeedOvenStub)
  return {
    sut,
    stepSpeedOvenValidationStub,
    addStepSpeedOvenStub
  }
}

describe('AddStepSpeedOven Controller', () => {
  test('Should call Validation with the correct values', async () => {
    const { sut, stepSpeedOvenValidationStub } = makeSut()
    const validateSpy = jest.spyOn(stepSpeedOvenValidationStub, 'validate')
    const httpRequest = await mockAddStepSpeedOvenRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.stepSpeedOven)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, stepSpeedOvenValidationStub } = makeSut()
    jest.spyOn(stepSpeedOvenValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockAddStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddStepSpeedOven with correct values', async () => {
    const { sut, addStepSpeedOvenStub } = makeSut()
    const addStepSpeedOvenSpy = jest.spyOn(addStepSpeedOvenStub, 'addStepSpeedOven')
    const httpRequest = await mockAddStepSpeedOvenRequest()
    await sut.handle(httpRequest)
    expect(addStepSpeedOvenSpy).toHaveBeenCalledWith(httpRequest.body.stepSpeedOven)
  })

  test('Should return 500 AddStepSpeedOven throws', async () => {
    const { sut, addStepSpeedOvenStub } = makeSut()
    jest.spyOn(addStepSpeedOvenStub, 'addStepSpeedOven').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockAddStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockAddStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created(mockReturnStepSpeedOven()))
  })
})
