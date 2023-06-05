import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { OvenModels } from '../../../domain/models/oven-models'
import { DownloadUpdate } from './../../../domain/usecases/download-update'
import { mockRequest, mockResponse } from '../../../domain/mocks/download-update'
import { Validation } from '../../protocols'
import { DownloadUpdateController } from './download-update-controller'
import { badRequest, download, noContent, serverError } from '../../helpers/http-helper'

class DownloadUpdateStub implements DownloadUpdate {
  async load (ovenModel: OvenModels): Promise<DownloadUpdate.Response> {
    return mockResponse()
  }
}

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}
interface SutTypes {
  sut: DownloadUpdateController
  downloadUpdateStub: DownloadUpdateStub
  validationStub: ValidationStub
}

const makeSut = ():SutTypes => {
  const downloadUpdateStub = new DownloadUpdateStub()
  const validationStub = new ValidationStub()
  const sut = new DownloadUpdateController(downloadUpdateStub, validationStub)

  return { sut, downloadUpdateStub, validationStub }
}

describe('Testing the DownloadUpdateController class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Dependency with DownloadUpdate class', () => {
    test('should call the load method only once', async () => {
      const { sut, downloadUpdateStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(downloadUpdateStub, 'load')
      const httpRequest = mockRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the load method with the correct parameter', async () => {
      const { sut, downloadUpdateStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(downloadUpdateStub, 'load')
      const httpRequest = mockRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledWith(httpRequest.params.ovenModel)
    })
    test('should return 200 if the load method a file path', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(download(mockResponse()))
    })
    test('should return 204 if the load method returns a empty string', async () => {
      const { sut, downloadUpdateStub } = makeSut()
      jest.spyOn(downloadUpdateStub, 'load').mockResolvedValue('')
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(noContent())
    })
    test('should return 500 if the load method throws', async () => {
      const { sut, downloadUpdateStub } = makeSut()
      jest.spyOn(downloadUpdateStub, 'load').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const loadEquipByIdSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockRequest()
      await sut.handle(httpRequest)
      expect(loadEquipByIdSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validationSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockRequest()
      await sut.handle(httpRequest)
      expect(validationSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(download(mockResponse()))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
})
