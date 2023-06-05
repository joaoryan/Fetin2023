/* eslint-disable no-undef */
import { Validation } from './update-store-controller-protocols'
import { UpdateStoreController } from './update-store-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateStore, UpdateStoreModel } from '../../../domain/usecases/update-store'
import { StoreModel } from '../../../domain/models/store'
import { MissingParamError } from '../../errors'
import { mockFakeStore, mockUpdateStoreRequest } from '../../../domain/mocks/store'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

const makeUpdateStore = (): UpdateStore => {
  class UpdateStoreStub implements UpdateStore {
    async updateStore (id: number, store: UpdateStoreModel): Promise<StoreModel> {
      return new Promise(resolve => resolve(mockFakeStore()))
    }
  }
  return new UpdateStoreStub()
}

interface SutTypes {
  sut: UpdateStoreController
  paramsValidationStub: Validation
  bodyValidationStub: Validation
  updateStoreStub: UpdateStore
}

const makeSut = (): SutTypes => {
  const paramsValidationStub = new ValidationStub()
  const bodyValidationStub = new ValidationStub()
  const updateStoreStub = makeUpdateStore()
  const sut = new UpdateStoreController(bodyValidationStub, paramsValidationStub, updateStoreStub)
  return {
    sut,
    paramsValidationStub,
    bodyValidationStub,
    updateStoreStub
  }
}

describe('UpdateStore Controller', () => {
  describe('ParamsValidation Dependency', () => {
    test('Should call ParamsValidation with the correct values', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = mockUpdateStoreRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })

    test('Should return 400 if ParamsValidation fails', async () => {
      const { sut, paramsValidationStub } = makeSut()
      jest.spyOn(paramsValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
      const httpResponse = await sut.handle(mockUpdateStoreRequest(1))
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })

  describe('BodyValidation Dependency', () => {
    test('Should call BodyValidation with the correct values', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = mockUpdateStoreRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.store)
    })

    test('Should return 400 if BodyValidation fails', async () => {
      const { sut, bodyValidationStub } = makeSut()
      jest.spyOn(bodyValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('store'))
      const httpResponse = await sut.handle(mockUpdateStoreRequest(1))
      expect(httpResponse).toEqual(badRequest(new MissingParamError('store')))
    })
  })

  test('Should call UpdateStore with correct values', async () => {
    const { sut, updateStoreStub } = makeSut()
    const updateStoreSpy = jest.spyOn(updateStoreStub, 'updateStore')
    const httpRequest = mockUpdateStoreRequest(1)
    await sut.handle(httpRequest)
    expect(updateStoreSpy).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body.store)
  })

  test('Should return 500 if UpdateStore throws', async () => {
    const { sut, updateStoreStub } = makeSut()
    jest.spyOn(updateStoreStub, 'updateStore').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockUpdateStoreRequest(1))
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockUpdateStoreRequest(1))
    expect(httpResponse).toEqual(ok({}))
  })
})
