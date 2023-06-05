import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { UpdateEquipmentController } from './Update-equipment-controller'
import { UpdateEquipment } from '../../../domain/usecases/Update-equipment'
import { Validation } from '../../protocols'
import { mockEquipModel, mockUpdateEquipmentRequest } from '../../../domain/mocks/equipment'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EquipModel, UpdateEquipModel } from './../../../domain/models/equipment'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from './../../errors/no-rows-affected-error'
import { LoadEquipByPin } from '../../../domain/usecases/load-equip-by-pin'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

class DbUpdateEquipmentStub implements UpdateEquipment {
  async update (id: number, equipment: UpdateEquipModel): Promise<boolean> {
    return true
  }
}

class LoadEquipByPinStub implements LoadEquipByPin {
  async load (IOKPin: String): Promise<EquipModel> {
    return new Promise((resolve) => resolve(Object.assign(mockEquipModel(), { id: 1 })))
  }
}

interface SutTypes {
  sut: UpdateEquipmentController
  paramsValidationStub: Validation
  bodyValidationStub: Validation
  dbUpdateEquipmentStub: UpdateEquipment
  loadEquipByPinStub: LoadEquipByPin;
}

const makeSut = (): SutTypes => {
  const paramsValidationStub = new ValidationStub()
  const bodyValidationStub = new ValidationStub()
  const dbUpdateEquipmentStub = new DbUpdateEquipmentStub()
  const loadEquipByPinStub = new LoadEquipByPinStub()
  const sut = new UpdateEquipmentController(paramsValidationStub, bodyValidationStub, dbUpdateEquipmentStub, loadEquipByPinStub)
  return {
    sut,
    paramsValidationStub,
    bodyValidationStub,
    dbUpdateEquipmentStub,
    loadEquipByPinStub
  }
}

describe('Testing the UpdateEquipmentController class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Dependency with ParamsValidator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = mockUpdateEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = mockUpdateEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockUpdateEquipmentRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, paramsValidationStub } = makeSut()
      jest.spyOn(paramsValidationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockUpdateEquipmentRequest(1))
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with BodyValidator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = mockUpdateEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = mockUpdateEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.equipment)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockUpdateEquipmentRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, bodyValidationStub } = makeSut()
      jest.spyOn(bodyValidationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockUpdateEquipmentRequest(1))
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with DbUpdateEquipment class', () => {
    test('should call the Update method only once', async () => {
      const { sut, dbUpdateEquipmentStub } = makeSut()
      const dbUpdateEquipmentSpy = jest.spyOn(dbUpdateEquipmentStub, 'update')
      const httpRequest = mockUpdateEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(dbUpdateEquipmentSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the Update method with the correct parameter', async () => {
      const { sut, dbUpdateEquipmentStub } = makeSut()
      const dbUpdateEquipmentSpy = jest.spyOn(dbUpdateEquipmentStub, 'update')
      const httpRequest = mockUpdateEquipmentRequest(1)
      await sut.handle(httpRequest)
      expect(dbUpdateEquipmentSpy).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body.equipment)
    })
    test('should return 200 if the Update method returns true ', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockUpdateEquipmentRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the Update method returns false ', async () => {
      const { sut, dbUpdateEquipmentStub } = makeSut()
      jest.spyOn(dbUpdateEquipmentStub, 'update').mockResolvedValue(false)
      const httpResponse = await sut.handle(mockUpdateEquipmentRequest(1))
      expect(httpResponse).toEqual(badRequest(new NoRowsAffected(1)))
    })
    test('should return 500 if the add method throws', async () => {
      const { sut, dbUpdateEquipmentStub } = makeSut()
      jest.spyOn(dbUpdateEquipmentStub, 'update').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockUpdateEquipmentRequest(1))
      expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('should return 400 if the equipment object is not in the body', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({ ...mockUpdateEquipmentRequest(1), body: {} })
      expect(httpResponse).toEqual(badRequest(new MissingParamError('equipment')))
    })
    test('should return 400 if the id parameter is not given', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({ ...mockUpdateEquipmentRequest(1), params: {} })
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })
})
