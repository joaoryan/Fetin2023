import { describe, test, expect, jest } from '@jest/globals'
import { Validation } from '../../protocols'
import { DeleteEquipment } from './../../../domain/usecases/delete-equipment'
import { DeleteEquipmentController } from './delete-equipment-controller'
import { mockDeleteEquipmentRequest } from './../../../domain/mocks/equipment/index'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from './../../errors/no-rows-affected-error'

class ValidationStub implements Validation {
  validate (input: {[key: string]: unknown}): Error | null {
    return null
  }
}

class DbDeleteEquipmentStub implements DeleteEquipment {
  async delete (id: number): Promise<boolean> {
    return true
  }
}

type SutTypes = {
  sut: DeleteEquipmentController
  validationStub: Validation
  dbDeleteEquipmentStub: DeleteEquipment
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const dbDeleteEquipmentStub = new DbDeleteEquipmentStub()
  const sut = new DeleteEquipmentController(validationStub, dbDeleteEquipmentStub)
  return { sut, validationStub, dbDeleteEquipmentStub }
}

describe('Testing the DeleteEquipmentController class', () => {
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockDeleteEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockDeleteEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockDeleteEquipmentRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockDeleteEquipmentRequest(1))
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })
  describe('Dependency with DbDeleteEquipment class', () => {
    test('should call the delete method only once', async () => {
      const { sut, dbDeleteEquipmentStub } = makeSut()
      const dbDeleteEquipmentSpy = jest.spyOn(dbDeleteEquipmentStub, 'delete')
      const httpRequest = mockDeleteEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(dbDeleteEquipmentSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the delete method with the correct parameter', async () => {
      const { sut, dbDeleteEquipmentStub } = makeSut()
      const dbDeleteEquipmentSpy = jest.spyOn(dbDeleteEquipmentStub, 'delete')
      const httpRequest = mockDeleteEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(dbDeleteEquipmentSpy).toHaveBeenCalledWith(httpRequest.params.id)
    })
    test('should return 200 if the delete method returns true ', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockDeleteEquipmentRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the delete method returns false ', async () => {
      const { sut, dbDeleteEquipmentStub } = makeSut()
      jest.spyOn(dbDeleteEquipmentStub, 'delete').mockResolvedValue(false)
      const httpResponse = await sut.handle(mockDeleteEquipmentRequest(1))
      expect(httpResponse).toEqual(badRequest(new NoRowsAffected(1)))
    })
    test('should return 500 if the delete method throws', async () => {
      const { sut, dbDeleteEquipmentStub } = makeSut()
      jest.spyOn(dbDeleteEquipmentStub, 'delete').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockDeleteEquipmentRequest(1))
      expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('should return 400 if the id is not in the params', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({ params: {} })
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })
})
