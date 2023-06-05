/* eslint-disable no-undef */
import { Validation } from './add-step-CombiOvenCMAX-controller-protocols'
import { AddStepCombiOvenCMAXController } from './add-step-CombiOvenCMAX-controller'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { AddStepCombiOvenCMAXModel, AddStepCombiOvenCMAX } from '../../../domain/usecases/add-step-CombiOvenCMAX'
import { StepCombiOvenCMAXModel } from '../../../domain/models/stepCombiOvenCMAX'
import { mockAddStepCombiOvenCMAXRequest, mockReturnStepCombiOvenCMAX } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddStepCombiOvenCMAX = (): AddStepCombiOvenCMAX => {
  class AddStepCombiOvenCMAXStub implements AddStepCombiOvenCMAX {
    async addStepCombiOvenCMAX (stepCombiOvenCMAX: AddStepCombiOvenCMAXModel): Promise<StepCombiOvenCMAXModel> {
      return mockReturnStepCombiOvenCMAX()
    }
  }
  return new AddStepCombiOvenCMAXStub()
}

interface SutTypes {
  sut: AddStepCombiOvenCMAXController
  stepCombiOvenCMAXValidationStub: Validation
  addStepCombiOvenCMAXStub: AddStepCombiOvenCMAX
}

const makeSut = (): SutTypes => {
  const stepCombiOvenCMAXValidationStub = makeValidation()
  const addStepCombiOvenCMAXStub = makeAddStepCombiOvenCMAX()
  const sut = new AddStepCombiOvenCMAXController(stepCombiOvenCMAXValidationStub, addStepCombiOvenCMAXStub)
  return {
    sut,
    stepCombiOvenCMAXValidationStub,
    addStepCombiOvenCMAXStub
  }
}

describe('AddStepCombiOvenCMAX Controller', () => {
  test('Should call Validation with the correct values', async () => {
    const { sut, stepCombiOvenCMAXValidationStub } = makeSut()
    const validateSpy = jest.spyOn(stepCombiOvenCMAXValidationStub, 'validate')
    const httpRequest = await mockAddStepCombiOvenCMAXRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.stepCombiOvenCMAX)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, stepCombiOvenCMAXValidationStub } = makeSut()
    jest.spyOn(stepCombiOvenCMAXValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockAddStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddStepCombiOvenCMAX with correct values', async () => {
    const { sut, addStepCombiOvenCMAXStub } = makeSut()
    const addStepCombiOvenCMAXSpy = jest.spyOn(addStepCombiOvenCMAXStub, 'addStepCombiOvenCMAX')
    const httpRequest = await mockAddStepCombiOvenCMAXRequest()
    await sut.handle(httpRequest)
    expect(addStepCombiOvenCMAXSpy).toHaveBeenCalledWith(httpRequest.body.stepCombiOvenCMAX)
  })

  test('Should return 500 AddStepCombiOvenCMAX throws', async () => {
    const { sut, addStepCombiOvenCMAXStub } = makeSut()
    jest.spyOn(addStepCombiOvenCMAXStub, 'addStepCombiOvenCMAX').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockAddStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockAddStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created(mockReturnStepCombiOvenCMAX()))
  })
})
