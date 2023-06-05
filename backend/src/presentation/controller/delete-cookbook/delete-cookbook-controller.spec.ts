import { describe, test, expect, jest } from '@jest/globals'
import { Validation } from '../../protocols'
import { DeleteCookbookController } from './delete-cookbook-controller'
import { mockDeleteCookbookRequest } from '../../../domain/mocks/cookbook'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { DeleteCookbook } from '../../../domain/usecases/delete-cookbook'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

class DbDeleteCookbookStub implements DeleteCookbook {
  async deleteCookbook (id: number): Promise<boolean> {
    return true
  }
}

type SutTypes = {
  sut: DeleteCookbookController
  validationStub: Validation
  dbDeleteCookbookStub: DeleteCookbook
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const dbDeleteCookbookStub = new DbDeleteCookbookStub()
  const sut = new DeleteCookbookController(validationStub, dbDeleteCookbookStub)
  return { sut, validationStub, dbDeleteCookbookStub }
}

describe('Testing the DeleteCookbookController class', () => {
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = await mockDeleteCookbookRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = await mockDeleteCookbookRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith({ id: httpRequest.body.cookbook[0].id, equipType: httpRequest.body.cookbook[0].equipType })
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockDeleteCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpRequest = await mockDeleteCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })
  describe('Dependency with DbDeleteCookbook class', () => {
    test('should call the delete method only once', async () => {
      const { sut, dbDeleteCookbookStub } = makeSut()
      const dbDeleteEquipmentSpy = jest.spyOn(dbDeleteCookbookStub, 'deleteCookbook')
      const httpRequest = await mockDeleteCookbookRequest()
      await sut.handle(httpRequest)
      expect(dbDeleteEquipmentSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the delete method with the correct parameter', async () => {
      const { sut, dbDeleteCookbookStub } = makeSut()
      const dbDeleteEquipmentSpy = jest.spyOn(dbDeleteCookbookStub, 'deleteCookbook')
      const httpRequest = await mockDeleteCookbookRequest()
      await sut.handle(httpRequest)
      expect(dbDeleteEquipmentSpy).toHaveBeenCalledWith(httpRequest.body.cookbook[0].id, httpRequest.body.cookbook[0].equipType)
    })
    test('should return 200 if the delete method returns true ', async () => {
      const { sut } = makeSut()
      const httpRequest = await mockDeleteCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the delete method returns false ', async () => {
      const { sut, dbDeleteCookbookStub } = makeSut()
      jest.spyOn(dbDeleteCookbookStub, 'deleteCookbook').mockResolvedValue(false)
      const httpRequest = await mockDeleteCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new NoRowsAffected(httpRequest.body.cookbook[0].id)))
    })
    test('should return 500 if the delete method throws', async () => {
      const { sut, dbDeleteCookbookStub } = makeSut()
      jest.spyOn(dbDeleteCookbookStub, 'deleteCookbook').mockRejectedValue(new Error())
      const httpRequest = await mockDeleteCookbookRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
