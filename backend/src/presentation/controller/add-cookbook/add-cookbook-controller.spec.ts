import { describe, test, expect, jest } from '@jest/globals'
import { AddCookbookController } from './add-cookbook-controller'
import { Validation } from '../../protocols'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { mockAddCookbookRequest, mockReturnCookbook } from '../../../domain/mocks/cookbook'
import { AddCookbook, AddCookbookModel } from '../../../domain/usecases/add-cookbook'
import { RecipeCookbookModel } from '../../../domain/models/recipe-cookbook'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

class DbAddCookbookStub implements AddCookbook {
  async addCookbook (cookbook: AddCookbookModel): Promise<RecipeCookbookModel | null> {
    return mockReturnCookbook()
  }
}

interface SutTypes {
  sut: AddCookbookController
  validationStub: Validation
  dbAddCookbookStub: AddCookbook
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const dbAddCookbookStub = new DbAddCookbookStub()
  const sut = new AddCookbookController(validationStub, dbAddCookbookStub)
  return {
    sut,
    validationStub,
    dbAddCookbookStub
  }
}

describe('Testing the AddCookbookController class', () => {
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = await mockAddCookbookRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = await mockAddCookbookRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.cookbook)
    })
    test('should return 201 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockAddCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(created<RecipeCookbookModel>(mockReturnCookbook()))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpRequest = await mockAddCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with DbAddCookbook class', () => {
    test('should call the add method only once', async () => {
      const { sut, dbAddCookbookStub } = makeSut()
      const dbAddEquipmentSpy = jest.spyOn(dbAddCookbookStub, 'addCookbook')
      const httpRequest = await mockAddCookbookRequest()
      await sut.handle(httpRequest)
      expect(dbAddEquipmentSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the add method with the correct parameter', async () => {
      const { sut, dbAddCookbookStub } = makeSut()
      const dbAddEquipmentSpy = jest.spyOn(dbAddCookbookStub, 'addCookbook')
      const httpRequest = await mockAddCookbookRequest()
      await sut.handle(httpRequest)
      expect(dbAddEquipmentSpy).toHaveBeenCalledWith(httpRequest.body.cookbook)
    })
    test('should return 201 if the add method returns an object ', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockAddCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(created(mockReturnCookbook()))
    })
    test('should return 500 if the add method throws', async () => {
      const { sut, dbAddCookbookStub } = makeSut()
      jest.spyOn(dbAddCookbookStub, 'addCookbook').mockRejectedValue(new Error())
      const httpRequest = await mockAddCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('should return 400 if the cookbook object is not in the body', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({ body: {} })
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
})
