/* eslint-disable no-undef */
import { Validation } from './add-step-CombiOvenTSI-controller-protocols'
import { AddStepCombiOvenTSIController } from './add-step-CombiOvenTSI-controller'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { AddStepCombiOvenTSIModel, AddStepCombiOvenTSI } from '../../../domain/usecases/add-step-CombiOvenTSI'
import { StepCombiOvenTSIModel } from '../../../domain/models/stepCombiOvenTSI'
import { mockAddStepCombiOvenTSIRequest, mockReturnStepCombiOvenTSI } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddStepCombiOvenTSI = (): AddStepCombiOvenTSI => {
  class AddStepCombiOvenTSIStub implements AddStepCombiOvenTSI {
    async addStepCombiOvenTSI (stepCombiOvenTSI: AddStepCombiOvenTSIModel): Promise<StepCombiOvenTSIModel> {
      return mockReturnStepCombiOvenTSI()
    }
  }
  return new AddStepCombiOvenTSIStub()
}

interface SutTypes {
  sut: AddStepCombiOvenTSIController
  stepCombiOvenTSIValidationStub: Validation
  addStepCombiOvenTSIStub: AddStepCombiOvenTSI
}

const makeSut = (): SutTypes => {
  const stepCombiOvenTSIValidationStub = makeValidation()
  const addStepCombiOvenTSIStub = makeAddStepCombiOvenTSI()
  const sut = new AddStepCombiOvenTSIController(stepCombiOvenTSIValidationStub, addStepCombiOvenTSIStub)
  return {
    sut,
    stepCombiOvenTSIValidationStub,
    addStepCombiOvenTSIStub
  }
}

describe('AddStepCombiOvenTSI Controller', () => {
  test('Should call Validation with the correct values', async () => {
    const { sut, stepCombiOvenTSIValidationStub } = makeSut()
    const validateSpy = jest.spyOn(stepCombiOvenTSIValidationStub, 'validate')
    const httpRequest = await mockAddStepCombiOvenTSIRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.stepCombiOvenTSI)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, stepCombiOvenTSIValidationStub } = makeSut()
    jest.spyOn(stepCombiOvenTSIValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockAddStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddStepCombiOvenTSI with correct values', async () => {
    const { sut, addStepCombiOvenTSIStub } = makeSut()
    const addStepCombiOvenTSISpy = jest.spyOn(addStepCombiOvenTSIStub, 'addStepCombiOvenTSI')
    const httpRequest = await mockAddStepCombiOvenTSIRequest()
    await sut.handle(httpRequest)
    expect(addStepCombiOvenTSISpy).toHaveBeenCalledWith(httpRequest.body.stepCombiOvenTSI)
  })

  test('Should return 500 AddStepCombiOvenTSI throws', async () => {
    const { sut, addStepCombiOvenTSIStub } = makeSut()
    jest.spyOn(addStepCombiOvenTSIStub, 'addStepCombiOvenTSI').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockAddStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockAddStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created(mockReturnStepCombiOvenTSI()))
  })
})
