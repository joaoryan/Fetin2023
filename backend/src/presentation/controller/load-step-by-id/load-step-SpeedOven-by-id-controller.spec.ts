import { describe, test, expect, jest } from '@jest/globals'
import { noContent, ok, serverError } from '../../helpers/http-helper'
import { LoadStepSpeedOvenById } from './load-step-SpeedOven-by-id-controller-protocols'
import { StepSpeedOvenModel } from '../../../domain/models/stepSpeedOven'
import { LoadStepSpeedOvenByIdController } from './load-step-SpeedOven-by-id-controller'
import { Validation } from '../../protocols'
import { mockLoadStepSpeedOvenRequest, mockReturnStepSpeedOven } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadStepSpeedOvenById = (): LoadStepSpeedOvenById => {
  class LoadStepSpeedOvenByIdStub implements LoadStepSpeedOvenById {
    loadStepSpeedOvenById (id: number): Promise<StepSpeedOvenModel | null> {
      return new Promise(resolve => resolve(mockReturnStepSpeedOven()))
    }
  }
  return new LoadStepSpeedOvenByIdStub()
}

interface SutTypes {
  sut: LoadStepSpeedOvenByIdController
  loadStepSpeedOvenByIdStub: LoadStepSpeedOvenById
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadStepSpeedOvenByIdStub = makeLoadStepSpeedOvenById()
  const validationStub = makeValidation()
  const sut = new LoadStepSpeedOvenByIdController(loadStepSpeedOvenByIdStub, validationStub)
  return {
    sut,
    loadStepSpeedOvenByIdStub,
    validationStub
  }
}

describe('LoadStepSpeedOvenById UseCase', () => {
  test('Should call LoadStepSpeedOvenById with correct values', async () => {
    const { sut, loadStepSpeedOvenByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadStepSpeedOvenByIdStub, 'loadStepSpeedOvenById')
    const httpRequest = await mockLoadStepSpeedOvenRequest()
    const { id } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(id)
  })

  test('Should return 500 if LoadStepSpeedOvenById throws', async () => {
    const { sut, loadStepSpeedOvenByIdStub } = makeSut()
    jest.spyOn(loadStepSpeedOvenByIdStub, 'loadStepSpeedOvenById').mockRejectedValue(new Error())
    const httpRequest = await mockLoadStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadStepSpeedOvenById returns null', async () => {
    const { sut, loadStepSpeedOvenByIdStub } = makeSut()
    jest.spyOn(loadStepSpeedOvenByIdStub, 'loadStepSpeedOvenById').mockImplementationOnce(() => new Promise(resolve => resolve(null)))
    const httpRequest = await mockLoadStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadStepSpeedOvenRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(mockReturnStepSpeedOven()))
  })
})
