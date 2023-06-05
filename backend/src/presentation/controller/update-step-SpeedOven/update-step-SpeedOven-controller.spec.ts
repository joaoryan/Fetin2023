/* eslint-disable no-undef */
import { Validation } from './update-step-SpeedOven-controller-protocols'
import { UpdateStepSpeedOvenController } from './update-step-SpeedOven-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateStepSpeedOven, UpdateStepSpeedOvenModel } from '../../../domain/usecases/update-step-SpeedOven'
import { MissingParamError } from '../../errors'
import { mockUpdateStepSpeedOvenRequest } from '../../../domain/mocks/menus'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

const makeUpdateStepSpeedOven = (): UpdateStepSpeedOven => {
  class UpdateStepSpeedOvenStub implements UpdateStepSpeedOven {
    async updateStepSpeedOven (id: number, stepSpeedOven: UpdateStepSpeedOvenModel): Promise<boolean> {
      return true
    }
  }
  return new UpdateStepSpeedOvenStub()
}

interface SutTypes {
  sut: UpdateStepSpeedOvenController
  paramsValidationStub: Validation
  bodyValidationStub: Validation
  updateStepSpeedOvenStub: UpdateStepSpeedOven
}

const makeSut = (): SutTypes => {
  const paramsValidationStub = new ValidationStub()
  const bodyValidationStub = new ValidationStub()
  const updateStepSpeedOvenStub = makeUpdateStepSpeedOven()
  const sut = new UpdateStepSpeedOvenController(bodyValidationStub, paramsValidationStub, updateStepSpeedOvenStub)
  return {
    sut,
    paramsValidationStub,
    bodyValidationStub,
    updateStepSpeedOvenStub
  }
}

describe('UpdateStepSpeedOven Controller', () => {
  describe('ParamsValidation Dependency', () => {
    test('Should call ParamsValidation with the correct values', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = await mockUpdateStepSpeedOvenRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })

    test('Should return 400 if ParamsValidation fails', async () => {
      const { sut, paramsValidationStub } = makeSut()
      jest.spyOn(paramsValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
      const httpRequest = await mockUpdateStepSpeedOvenRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })

  describe('BodyValidation Dependency', () => {
    test('Should call BodyValidation with the correct values', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = await mockUpdateStepSpeedOvenRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.stepSpeedOven)
    })

    test('Should return 400 if BodyValidation fails', async () => {
      const { sut, bodyValidationStub } = makeSut()
      jest.spyOn(bodyValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('stepSpeedOven'))
      const httpRequest = await mockUpdateStepSpeedOvenRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('stepSpeedOven')))
    })
  })

  test('Should call UpdateStepSpeedOven with correct values', async () => {
    const { sut, updateStepSpeedOvenStub } = makeSut()
    const updateStepSpeedOvenSpy = jest.spyOn(updateStepSpeedOvenStub, 'updateStepSpeedOven')
    const httpRequest = await mockUpdateStepSpeedOvenRequest()
    await sut.handle(httpRequest)
    expect(updateStepSpeedOvenSpy).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body.stepSpeedOven)
  })

  test('Should return 500 if UpdateStepSpeedOven throws', async () => {
    const { sut, updateStepSpeedOvenStub } = makeSut()
    jest.spyOn(updateStepSpeedOvenStub, 'updateStepSpeedOven').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockUpdateStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockUpdateStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
