import { describe, test, expect, jest } from '@jest/globals'
import { noContent, ok, serverError } from '../../helpers/http-helper'
import { LoadStoreById } from './load-store-by-id-controller-protocols'
import { StoreModel } from '../../../domain/models/store'
import { LoadStoreByIdController } from './load-store-by-id-controller'
import { Validation } from '../../protocols'
import { mockLoadStoreByIdRequest, mockLoadStoreByIdResponse } from '../../../domain/mocks/store'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadStoreById = (): LoadStoreById => {
  class LoadStoreByIdStub implements LoadStoreById {
    loadStoreById (id: number): Promise<StoreModel | null> {
      return new Promise(resolve => resolve(mockLoadStoreByIdResponse()))
    }
  }
  return new LoadStoreByIdStub()
}

interface SutTypes {
  sut: LoadStoreByIdController
  loadStoreByIdStub: LoadStoreById
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadStoreByIdStub = makeLoadStoreById()
  const validationStub = makeValidation()
  const sut = new LoadStoreByIdController(loadStoreByIdStub, validationStub)
  return {
    sut,
    loadStoreByIdStub,
    validationStub
  }
}

describe('LoadStoreById UseCase', () => {
  test('Should call LoadStoreById with correct values', async () => {
    const { sut, loadStoreByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadStoreByIdStub, 'loadStoreById')
    const httpRequest = mockLoadStoreByIdRequest()
    const { id } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(id)
  })

  test('Should return 500 if LoadStoreById throws', async () => {
    const { sut, loadStoreByIdStub } = makeSut()
    jest.spyOn(loadStoreByIdStub, 'loadStoreById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(mockLoadStoreByIdRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadStoreById returns null', async () => {
    const { sut, loadStoreByIdStub } = makeSut()
    jest.spyOn(loadStoreByIdStub, 'loadStoreById').mockImplementationOnce(() => new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockLoadStoreByIdRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockLoadStoreByIdRequest())
    expect(httpResponse).toEqual(ok(mockLoadStoreByIdResponse()))
  })
})
