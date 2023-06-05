/* eslint-disable no-undef */
import { Validation } from './delete-store-controller-protocols'
import { DeleteStoreController } from './delete-store-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { DeleteStore } from '../../../domain/usecases/delete-store'
import { MissingParamError } from '../../errors'
import { mockDeleteStoreRequest } from '../../../domain/mocks/store'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteStore = (): DeleteStore => {
  class DeleteStoreStub implements DeleteStore {
    async deleteStore (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteStoreStub()
}

interface SutTypes {
  sut: DeleteStoreController
  storeValidationStub: Validation
  deleteStoreStub: DeleteStore
}

const makeSut = (): SutTypes => {
  const storeValidationStub = makeValidation()
  const deleteStoreStub = makeDeleteStore()
  const sut = new DeleteStoreController(storeValidationStub, deleteStoreStub)
  return {
    sut,
    storeValidationStub,
    deleteStoreStub
  }
}

describe('DeleteStore Controller', () => {
  test('Should call Validation with the correct values', async () => {
    const { sut, storeValidationStub } = makeSut()
    const validateSpy = jest.spyOn(storeValidationStub, 'validate')
    const httpRequest = mockDeleteStoreRequest(1)
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, storeValidationStub } = makeSut()
    jest.spyOn(storeValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
    const httpResponse = await sut.handle({ params: { id: 'invalid' } })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should call deleteStore with correct values', async () => {
    const { sut, deleteStoreStub } = makeSut()
    const deleteStoreSpy = jest.spyOn(deleteStoreStub, 'deleteStore')
    const httpRequest = mockDeleteStoreRequest(1)
    await sut.handle(httpRequest)
    expect(deleteStoreSpy).toHaveBeenLastCalledWith(httpRequest.params.id)
  })

  test('Should return 500 when deleteStore throws', async () => {
    const { sut, deleteStoreStub } = makeSut()
    jest.spyOn(deleteStoreStub, 'deleteStore').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockDeleteStoreRequest(1))
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockDeleteStoreRequest(1))
    expect(httpResponse).toEqual(ok({}))
  })
})
