import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { mockLoadEquipByIdResponse, mockLoadEquipByIdRequest } from './../../../domain/mocks/equipment'
import { LoadEquipById } from './../../../domain/usecases/load-equip-by-id'
import { LoadEquipByIdController } from './load-equip-by-id-controller'
import { badRequest, noContent, ok, serverError } from './../../helpers/http-helper'
import { Validation } from '../../protocols'

class LoadEquipByIdStub implements LoadEquipById {
  async load (id: number): Promise<LoadEquipById.Response> {
    return mockLoadEquipByIdResponse()
  }
}

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}
interface SutTypes {
  sut: LoadEquipByIdController
  loadEquipByIdStub: LoadEquipByIdStub
  validationStub: ValidationStub
}

const makeSut = ():SutTypes => {
  const loadEquipByIdStub = new LoadEquipByIdStub()
  const validationStub = new ValidationStub()
  const sut = new LoadEquipByIdController(loadEquipByIdStub, validationStub)

  return { sut, loadEquipByIdStub, validationStub }
}

describe('Testing the LoadEquipByIdController class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Dependency with LoadEquipById class', () => {
    test('should call the load method only once', async () => {
      const { sut, loadEquipByIdStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(loadEquipByIdStub, 'load')
      const httpRequest = mockLoadEquipByIdRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the load method with the correct parameter', async () => {
      const { sut, loadEquipByIdStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(loadEquipByIdStub, 'load')
      const httpRequest = mockLoadEquipByIdRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledWith(httpRequest.params.id)
    })
    test('should return 200 if the load method returns a equipment', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockLoadEquipByIdRequest())
      expect(httpResponse).toEqual(ok(mockLoadEquipByIdResponse()))
    })
    test('should return 204 if the load method returns null', async () => {
      const { sut, loadEquipByIdStub } = makeSut()
      jest.spyOn(loadEquipByIdStub, 'load').mockResolvedValue(null)
      const httpResponse = await sut.handle(mockLoadEquipByIdRequest())
      expect(httpResponse).toEqual(noContent())
    })
    test('should return 500 if the load method throws', async () => {
      const { sut, loadEquipByIdStub } = makeSut()
      jest.spyOn(loadEquipByIdStub, 'load').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockLoadEquipByIdRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockLoadEquipByIdRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validationSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockLoadEquipByIdRequest()
      await sut.handle(httpRequest)
      expect(validationSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockLoadEquipByIdRequest())
      expect(httpResponse).toEqual(ok(mockLoadEquipByIdResponse()))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockLoadEquipByIdRequest())
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
})
