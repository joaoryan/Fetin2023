import { describe, test, expect, jest } from '@jest/globals'
import { AddEquipmentController } from './add-equipment-controller'
import { CreatEquipOvenModel, EquipModel } from '../../../domain/models/equipment'
import { AddEquipment } from '../../../domain/usecases/add-equipment'
import { Validation } from '../../protocols'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { mockAddEquipmentRequest, mockAddEquipmentResponse } from '../../../domain/mocks/equipment/'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

class DbAddEquipmentStub implements AddEquipment {
  async add (equipment: CreatEquipOvenModel): Promise<EquipModel> {
    return mockAddEquipmentResponse()
  }
}

interface SutTypes {
  sut: AddEquipmentController
  validationStub: Validation
  dbAddEquipmentStub: AddEquipment
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const dbAddEquipmentStub = new DbAddEquipmentStub()
  const sut = new AddEquipmentController(validationStub, dbAddEquipmentStub)
  return {
    sut,
    validationStub,
    dbAddEquipmentStub
  }
}

describe('Testing the AddEquipmentController class', () => {
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockAddEquipmentRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockAddEquipmentRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('should return 201 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockAddEquipmentRequest())
      expect(httpResponse).toEqual(created<AddEquipment.Response>(httpResponse.body))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockAddEquipmentRequest())
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with DbAddEquipment class', () => {
    test('should call the add method only once', async () => {
      const { sut, dbAddEquipmentStub } = makeSut()
      const dbAddEquipmentSpy = jest.spyOn(dbAddEquipmentStub, 'add')
      const httpRequest = mockAddEquipmentRequest()
      await sut.handle(httpRequest)
      expect(dbAddEquipmentSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the add method with the correct parameter', async () => {
      const { sut, dbAddEquipmentStub } = makeSut()
      const dbAddEquipmentSpy = jest.spyOn(dbAddEquipmentStub, 'add')
      const httpRequest = mockAddEquipmentRequest()
      await sut.handle(httpRequest)
      expect(dbAddEquipmentSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('should return 201 if the add method returns an object ', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockAddEquipmentRequest())
      expect(httpResponse).toEqual(created(httpResponse.body))
    })
    test('should return 500 if the add method throws', async () => {
      const { sut, dbAddEquipmentStub } = makeSut()
      jest.spyOn(dbAddEquipmentStub, 'add').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockAddEquipmentRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
    /* test('should return 400 if the equipment object is not in the body', async () => {
       const { sut } = makeSut()
       const httpResponse = await sut.handle({ body: {} })
       expect(httpResponse).toEqual(badRequest(new Error()))
     }) */
  })
})
