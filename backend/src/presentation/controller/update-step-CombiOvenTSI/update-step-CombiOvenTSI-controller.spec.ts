/* eslint-disable no-undef */
import { Validation } from './update-step-CombiOvenTSI-controller-protocols'
import { UpdateStepCombiOvenTSIController } from './update-step-CombiOvenTSI-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateStepCombiOvenTSI, UpdateStepCombiOvenTSIModel } from '../../../domain/usecases/update-step-CombiOvenTSI'
import { MissingParamError } from '../../errors'
import { mockUpdateStepCombiOvenTSIRequest } from '../../../domain/mocks/menus'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

const makeUpdateStepCombiOvenTSI = (): UpdateStepCombiOvenTSI => {
  class UpdateStepCombiOvenTSIStub implements UpdateStepCombiOvenTSI {
    async updateStepCombiOvenTSI (id: number, stepCombiOvenTSI: UpdateStepCombiOvenTSIModel): Promise<boolean> {
      return true
    }
  }
  return new UpdateStepCombiOvenTSIStub()
}

interface SutTypes {
  sut: UpdateStepCombiOvenTSIController
  paramsValidationStub: Validation
  bodyValidationStub: Validation
  updateStepCombiOvenTSIStub: UpdateStepCombiOvenTSI
}

const makeSut = (): SutTypes => {
  const paramsValidationStub = new ValidationStub()
  const bodyValidationStub = new ValidationStub()
  const updateStepCombiOvenTSIStub = makeUpdateStepCombiOvenTSI()
  const sut = new UpdateStepCombiOvenTSIController(bodyValidationStub, paramsValidationStub, updateStepCombiOvenTSIStub)
  return {
    sut,
    paramsValidationStub,
    bodyValidationStub,
    updateStepCombiOvenTSIStub
  }
}

describe('UpdateStepCombiOvenTSI Controller', () => {
  describe('ParamsValidation Dependency', () => {
    test('Should call ParamsValidation with the correct values', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })

    test('Should return 400 if ParamsValidation fails', async () => {
      const { sut, paramsValidationStub } = makeSut()
      jest.spyOn(paramsValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
      const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })

  describe('BodyValidation Dependency', () => {
    test('Should call BodyValidation with the correct values', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.stepCombiOvenTSI)
    })

    test('Should return 400 if BodyValidation fails', async () => {
      const { sut, bodyValidationStub } = makeSut()
      jest.spyOn(bodyValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('stepCombiOvenTSI'))
      const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('stepCombiOvenTSI')))
    })
  })

  test('Should call UpdateStepCombiOvenTSI with correct values', async () => {
    const { sut, updateStepCombiOvenTSIStub } = makeSut()
    const updateStepCombiOvenTSISpy = jest.spyOn(updateStepCombiOvenTSIStub, 'updateStepCombiOvenTSI')
    const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
    await sut.handle(httpRequest)
    expect(updateStepCombiOvenTSISpy).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body.stepCombiOvenTSI)
  })

  test('Should return 500 if UpdateStepCombiOvenTSI throws', async () => {
    const { sut, updateStepCombiOvenTSIStub } = makeSut()
    jest.spyOn(updateStepCombiOvenTSIStub, 'updateStepCombiOvenTSI').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
