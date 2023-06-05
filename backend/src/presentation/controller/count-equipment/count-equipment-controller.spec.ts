import { describe, test, expect, jest } from '@jest/globals'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { CountEquipment } from '../../../domain/usecases/count-equipment'
import { mockCountEquipmentRequest, mockCountEquipmentResponse } from './../../../domain/mocks/equipment/index'
import { CountEquipmentController } from './count-equipment-controller'
import { Controller, Validation } from '../../protocols'
import { InvalidParamError } from '../../errors'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}
class DbStub implements CountEquipment {
  async count (where?: CountEquipment.Parameter | undefined): Promise<CountEquipment.Response> {
    return mockCountEquipmentResponse()
  }
}

type SutTypes = {
  sut: Controller
  validationStub: Validation
  dbStub: CountEquipment
}

const makeSut = (): SutTypes => {
  const dbStub = new DbStub()
  const validationStub = new ValidationStub()
  const sut = new CountEquipmentController(validationStub, dbStub)
  return { sut, validationStub, dbStub }
}

describe('Testing the CountEquipmentController class', () => {
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockCountEquipmentRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockCountEquipmentRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.query.where)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockCountEquipmentRequest())
      expect(httpResponse).toEqual(ok(mockCountEquipmentResponse()))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const request = mockCountEquipmentRequest()
      const httpResponse = await sut.handle(request)
      expect(httpResponse).toEqual(badRequest(new InvalidParamError(Object.keys(request.query.where!)[0])))
    })
  })
  describe('Dependency with DbCountEquipment class', () => {
    test('should call the count method only once', async () => {
      const { sut, dbStub } = makeSut()
      const dbSpy = jest.spyOn(dbStub, 'count')
      const httpRequest = mockCountEquipmentRequest()
      await sut.handle(httpRequest)
      expect(dbSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the count method with the correct query (where)', async () => {
      const { sut, dbStub } = makeSut()
      const dbSpy = jest.spyOn(dbStub, 'count')
      const httpRequest = mockCountEquipmentRequest()
      await sut.handle(httpRequest)
      expect(dbSpy).toHaveBeenCalledWith(httpRequest.query.where)
    })
    test('should call the count method with the correct query (undefined)', async () => {
      const { sut, dbStub } = makeSut()
      const dbSpy = jest.spyOn(dbStub, 'count')
      const httpRequest = { query: {} }
      await sut.handle(httpRequest)
      expect(dbSpy).toHaveBeenCalledWith(undefined)
    })
    test('should return 200 on success', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockCountEquipmentRequest())
      expect(httpResponse).toEqual(ok(mockCountEquipmentResponse()))
    })
    test('should return 500 if the count method throws', async () => {
      const { sut, dbStub } = makeSut()
      jest.spyOn(dbStub, 'count').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockCountEquipmentRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
