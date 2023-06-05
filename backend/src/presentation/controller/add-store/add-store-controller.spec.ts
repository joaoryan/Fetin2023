/* eslint-disable no-undef */
import { Validation } from './add-store-controller-protocols'
import { AddStoreController } from './add-store-controller'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { AddStoreModel, AddStore } from '../../../domain/usecases/add-store'
import { StoreModel } from '../../../domain/models/store'
import { mockAddStoreRequest, mockAddStoreResponse } from './../../../domain/mocks/store/index'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddStore = (): AddStore => {
  class AddStoreStub implements AddStore {
    async addStore (store: AddStoreModel): Promise<StoreModel | null> {
      return new Promise(resolve => resolve(mockAddStoreResponse()))
    }
  }
  return new AddStoreStub()
}

interface SutTypes {
  sut: AddStoreController
  storeValidationStub: Validation
  addStoreStub: AddStore
}

const makeSut = (): SutTypes => {
  const storeValidationStub = makeValidation()
  const addStoreStub = makeAddStore()
  const sut = new AddStoreController(storeValidationStub, addStoreStub)
  return {
    sut,
    storeValidationStub,
    addStoreStub
  }
}

describe('AddStore Controller', () => {
  test('Should call Validation with the correct values', async () => {
    const { sut, storeValidationStub } = makeSut()
    const validateSpy = jest.spyOn(storeValidationStub, 'validate')
    const httpRequest = mockAddStoreRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.store)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, storeValidationStub } = makeSut()
    jest.spyOn(storeValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockAddStoreRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddStore with correct values', async () => {
    const { sut, addStoreStub } = makeSut()
    const addMenuSpy = jest.spyOn(addStoreStub, 'addStore')
    const httpRequest = mockAddStoreRequest()
    await sut.handle(mockAddStoreRequest())
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.body.store)
  })

  test('Should return 500 AddStore throws', async () => {
    const { sut, addStoreStub } = makeSut()
    jest.spyOn(addStoreStub, 'addStore').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockAddStoreRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAddStoreRequest())
    expect(httpResponse).toEqual(created(mockAddStoreResponse()))
  })
})
