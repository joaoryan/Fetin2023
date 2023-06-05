import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { mockLoadEquipByIdResponse, mockLoadHasUpdateEquipRequest } from '../../../domain/mocks/equipment'
import { LoadEquipById } from '../../../domain/usecases/load-equip-by-id'
import { LoadHasUpdateEquipController } from './load-has-update-equip-controller'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Validation } from '../../protocols'
import { formatEquipOven } from '../../../utils/formatEquipOven'

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
  sut: LoadHasUpdateEquipController
  loadEquipByIdStub: LoadEquipByIdStub
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const loadEquipByIdStub = new LoadEquipByIdStub()
  const validationStub = new ValidationStub()
  const sut = new LoadHasUpdateEquipController(loadEquipByIdStub, validationStub)

  return { sut, loadEquipByIdStub, validationStub }
}

describe('Testing the LoadHasUpdateEquipController class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Dependency with loadHasUpdateEquip class', () => {
    test('should call the load method only once', async () => {
      const { sut, loadEquipByIdStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(loadEquipByIdStub, 'load')
      const httpRequest = mockLoadHasUpdateEquipRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the load method with the correct parameter', async () => {
      const { sut, loadEquipByIdStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(loadEquipByIdStub, 'load')
      const httpRequest = mockLoadHasUpdateEquipRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledWith(httpRequest.params.idEquip)
    })
    test('should return 200 if the load method returns a equipment', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockLoadHasUpdateEquipRequest())
      expect(httpResponse).toEqual(ok(formatEquipOven(mockLoadEquipByIdResponse())))
    })
    test('should return 204 if the load method returns null', async () => {
      const { sut, loadEquipByIdStub } = makeSut()
      jest.spyOn(loadEquipByIdStub, 'load').mockResolvedValue(null)
      const httpResponse = await sut.handle(mockLoadHasUpdateEquipRequest())
      expect(httpResponse).toEqual(noContent())
    })
    test('should return 500 if the load method throws', async () => {
      const { sut, loadEquipByIdStub } = makeSut()
      jest.spyOn(loadEquipByIdStub, 'load').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockLoadHasUpdateEquipRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockLoadHasUpdateEquipRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validationSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockLoadHasUpdateEquipRequest()
      await sut.handle(httpRequest)
      expect(validationSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockLoadHasUpdateEquipRequest())
      expect(httpResponse).toEqual(ok(formatEquipOven(mockLoadEquipByIdResponse())))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockLoadHasUpdateEquipRequest())
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
})
