import { mockLoadEquipByCompanyIdResponse, mockLoadEquipByCompanyIdRequest } from './../../../domain/mocks/equipment'
import { LoadEquipByCompanyIdController } from './load-equip-by-company-id-controller'
import { badRequest, noContent, ok, serverError } from './../../helpers/http-helper'
import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { LoadEquipByCompanyId } from './../../../domain/usecases/load-equip-by-company-id'
import { Validation } from '../../protocols'
class LoadEquipByCompanyIdStub implements LoadEquipByCompanyId {
  async load (companyId: number, userId: number, userPrivilegeUser: string): Promise<LoadEquipByCompanyId.Response[]> {
    return mockLoadEquipByCompanyIdResponse()
  }
}

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}
interface SutTypes {
  sut: LoadEquipByCompanyIdController
  loadEquipByCompanyIdStub: LoadEquipByCompanyIdStub
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const loadEquipByCompanyIdStub = new LoadEquipByCompanyIdStub()
  const validationStub = new ValidationStub()
  const sut = new LoadEquipByCompanyIdController(loadEquipByCompanyIdStub, validationStub)

  return { sut, loadEquipByCompanyIdStub, validationStub }
}

describe('Testing the LoadEquipByCompanyId class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Dependency with LoadEquipByCompanyId class', () => {
    test('should call the load method only once', async () => {
      const { sut, loadEquipByCompanyIdStub } = makeSut()
      const loadEquipByCompanyIdSpy = jest.spyOn(loadEquipByCompanyIdStub, 'load')
      const httpRequest = mockLoadEquipByCompanyIdRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByCompanyIdSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the load method with the correct parameter', async () => {
      const { sut, loadEquipByCompanyIdStub } = makeSut()
      const loadEquipByCompanyIdSpy = jest.spyOn(loadEquipByCompanyIdStub, 'load')
      const httpRequest = mockLoadEquipByCompanyIdRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByCompanyIdSpy).toHaveBeenCalledWith(1, 1, 'admCli')
    })
    test('should return 200 if the load method returns a list of equipment', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockLoadEquipByCompanyIdRequest())
      expect(httpResponse).toEqual(ok(mockLoadEquipByCompanyIdResponse()))
    })
    test('should return 204 if the load method returns a empty list', async () => {
      const { sut, loadEquipByCompanyIdStub } = makeSut()
      jest.spyOn(loadEquipByCompanyIdStub, 'load').mockResolvedValue([])
      const httpResponse = await sut.handle(mockLoadEquipByCompanyIdRequest())
      expect(httpResponse).toEqual(noContent())
    })
    test('should return 500 if the load method throws', async () => {
      const { sut, loadEquipByCompanyIdStub } = makeSut()
      jest.spyOn(loadEquipByCompanyIdStub, 'load').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockLoadEquipByCompanyIdRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const loadEquipByCompanyIdSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockLoadEquipByCompanyIdRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByCompanyIdSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validationSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockLoadEquipByCompanyIdRequest()
      await sut.handle(httpRequest)
      expect(validationSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockLoadEquipByCompanyIdRequest())
      expect(httpResponse).toEqual(ok(mockLoadEquipByCompanyIdResponse()))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockLoadEquipByCompanyIdRequest())
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
})
