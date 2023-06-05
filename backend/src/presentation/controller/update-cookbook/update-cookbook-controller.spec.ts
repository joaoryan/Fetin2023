import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { UpdateCookbookController } from './update-cookbook-controller'
import { Validation } from '../../protocols'
import { mockUpdateCookbookRequest } from '../../../domain/mocks/cookbook'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { UpdateCookbook, UpdateCookbookModel } from '../../../domain/usecases/update-cookbook'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

class DbUpdateCookbookStub implements UpdateCookbook {
  async update (id: number, cookbook: UpdateCookbookModel): Promise<boolean> {
    return true
  }
}

interface SutTypes {
  sut: UpdateCookbookController
  paramsValidationStub: Validation
  bodyValidationStub: Validation
  dbUpdateCookbookStub: UpdateCookbook
}

const makeSut = (): SutTypes => {
  const paramsValidationStub = new ValidationStub()
  const bodyValidationStub = new ValidationStub()
  const dbUpdateCookbookStub = new DbUpdateCookbookStub()
  const sut = new UpdateCookbookController(paramsValidationStub, bodyValidationStub, dbUpdateCookbookStub)
  return {
    sut,
    paramsValidationStub,
    bodyValidationStub,
    dbUpdateCookbookStub
  }
}

describe('Testing the UpdateCookbookController class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Dependency with ParamsValidator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = await mockUpdateCookbookRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = await mockUpdateCookbookRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, paramsValidationStub } = makeSut()
      jest.spyOn(paramsValidationStub, 'validate').mockReturnValue(new Error())
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with BodyValidator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = await mockUpdateCookbookRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = await mockUpdateCookbookRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.cookbook)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, bodyValidationStub } = makeSut()
      jest.spyOn(bodyValidationStub, 'validate').mockReturnValue(new Error())
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with DbUpdateCookbook class', () => {
    test('should call the Update method only once', async () => {
      const { sut, dbUpdateCookbookStub } = makeSut()
      const dbUpdateEquipmentSpy = jest.spyOn(dbUpdateCookbookStub, 'update')
      const httpRequest = await mockUpdateCookbookRequest()
      await sut.handle(httpRequest)
      expect(dbUpdateEquipmentSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the Update method with the correct parameter', async () => {
      const { sut, dbUpdateCookbookStub } = makeSut()
      const dbUpdateEquipmentSpy = jest.spyOn(dbUpdateCookbookStub, 'update')
      const httpRequest = await mockUpdateCookbookRequest()
      await sut.handle(httpRequest)
      expect(dbUpdateEquipmentSpy).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body.cookbook)
    })
    test('should return 200 if the Update method returns true ', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the Update method returns false ', async () => {
      const { sut, dbUpdateCookbookStub } = makeSut()
      jest.spyOn(dbUpdateCookbookStub, 'update').mockResolvedValue(false)
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new NoRowsAffected(httpRequest.params.id)))
    })
    test('should return 500 if the add method throws', async () => {
      const { sut, dbUpdateCookbookStub } = makeSut()
      jest.spyOn(dbUpdateCookbookStub, 'update').mockRejectedValue(new Error())
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('should return 400 if the equipment object is not in the body', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle({ ...httpRequest, body: {} })
      expect(httpResponse).toEqual(badRequest(new MissingParamError('equipment')))
    })
    test('should return 400 if the id parameter is not given', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockUpdateCookbookRequest()
      const httpResponse = await sut.handle({ ...httpRequest, params: {} })
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })
})
