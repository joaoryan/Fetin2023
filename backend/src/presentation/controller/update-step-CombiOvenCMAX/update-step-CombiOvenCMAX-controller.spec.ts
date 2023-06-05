/* eslint-disable no-undef */
import { Validation } from './update-step-CombiOvenCMAX-controller-protocols'
import { UpdateStepCombiOvenCMAXController } from './update-step-CombiOvenCMAX-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateStepCombiOvenCMAX, UpdateStepCombiOvenCMAXModel } from '../../../domain/usecases/update-step-CombiOvenCMAX'
import { MissingParamError } from '../../errors'
import { mockUpdateStepCombiOvenCMAXRequest } from '../../../domain/mocks/menus'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

const makeUpdateStepCombiOvenCMAX = (): UpdateStepCombiOvenCMAX => {
  class UpdateStepCombiOvenCMAXStub implements UpdateStepCombiOvenCMAX {
    async updateStepCombiOvenCMAX (id: number, stepCombiOvenCMAX: UpdateStepCombiOvenCMAXModel): Promise<boolean> {
      return true
    }
  }
  return new UpdateStepCombiOvenCMAXStub()
}

interface SutTypes {
  sut: UpdateStepCombiOvenCMAXController
  paramsValidationStub: Validation
  bodyValidationStub: Validation
  updateStepCombiOvenCMAXStub: UpdateStepCombiOvenCMAX
}

const makeSut = (): SutTypes => {
  const paramsValidationStub = new ValidationStub()
  const bodyValidationStub = new ValidationStub()
  const updateStepCombiOvenCMAXStub = makeUpdateStepCombiOvenCMAX()
  const sut = new UpdateStepCombiOvenCMAXController(bodyValidationStub, paramsValidationStub, updateStepCombiOvenCMAXStub)
  return {
    sut,
    paramsValidationStub,
    bodyValidationStub,
    updateStepCombiOvenCMAXStub
  }
}

describe('UpdateStepCombiOvenCMAX Controller', () => {
  describe('ParamsValidation Dependency', () => {
    test('Should call ParamsValidation with the correct values', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })

    test('Should return 400 if ParamsValidation fails', async () => {
      const { sut, paramsValidationStub } = makeSut()
      jest.spyOn(paramsValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
      const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })

  describe('BodyValidation Dependency', () => {
    test('Should call BodyValidation with the correct values', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.stepCombiOvenCMAX)
    })

    test('Should return 400 if BodyValidation fails', async () => {
      const { sut, bodyValidationStub } = makeSut()
      jest.spyOn(bodyValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('stepCombiOvenCMAX'))
      const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('stepCombiOvenCMAX')))
    })
  })

  test('Should call UpdateStepCombiOvenCMAX with correct values', async () => {
    const { sut, updateStepCombiOvenCMAXStub } = makeSut()
    const updateStepCombiOvenCMAXSpy = jest.spyOn(updateStepCombiOvenCMAXStub, 'updateStepCombiOvenCMAX')
    const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
    await sut.handle(httpRequest)
    expect(updateStepCombiOvenCMAXSpy).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body.stepCombiOvenCMAX)
  })

  test('Should return 500 if UpdateStepCombiOvenCMAX throws', async () => {
    const { sut, updateStepCombiOvenCMAXStub } = makeSut()
    jest.spyOn(updateStepCombiOvenCMAXStub, 'updateStepCombiOvenCMAX').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
