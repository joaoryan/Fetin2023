/* eslint-disable no-undef */
import { AddStoreModel, StoreModel, AddStoreRepository } from './db-add-store-protocols'
import { DbAddStore } from './db-add-store'
import { mockFakeStore, mockFakeStoreWithId } from '../../../domain/mocks/store'

const makeAddStoreRepository = (): AddStoreRepository => {
  class AddStoreRepositoryStub implements AddStoreRepository {
    async addStore (storeData: AddStoreModel): Promise<StoreModel> {
      return new Promise(resolve => resolve(mockFakeStore()))
    }
  }
  return new AddStoreRepositoryStub()
}

interface SutTypes {
  sut: DbAddStore
  addStoreRepositoryStub: AddStoreRepository
}

const makeSut = (): SutTypes => {
  const addStoreRepositoryStub = makeAddStoreRepository()
  const sut = new DbAddStore(addStoreRepositoryStub)
  return {
    sut,
    addStoreRepositoryStub
  }
}

describe('DbAddStore Usecase', () => {
  test('Should call AddStoreRepository with correct values', async () => {
    const { sut, addStoreRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addStoreRepositoryStub, 'addStore')
    await sut.addStore(mockFakeStoreWithId())
    expect(addSpy).toHaveBeenCalledWith(mockFakeStoreWithId())
  })

  test('Should throw if AddStoreRepository throws', async () => {
    const { sut, addStoreRepositoryStub } = makeSut()
    jest.spyOn(addStoreRepositoryStub, 'addStore').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.addStore(mockFakeStoreWithId())
    await expect(promise).rejects.toThrow()
  })
})
