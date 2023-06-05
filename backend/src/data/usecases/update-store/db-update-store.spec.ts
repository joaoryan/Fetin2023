/* eslint-disable no-undef */
import { DbUpdateStore } from './db-update-store'
import { StoreModel, UpdateStoreRepository, LoadStoreByIdRepository } from './db-update-store-protocols'
import { mockFakeStore } from '../../../domain/mocks/store'

const makeUpdateStoreRepository = (): UpdateStoreRepository => {
  class UpdateStoreRepositoryStub implements UpdateStoreRepository {
    async updateStore (id: number, storeData: StoreModel): Promise<StoreModel> {
      return new Promise(resolve => resolve(mockFakeStore()))
    }
  }
  return new UpdateStoreRepositoryStub()
}

const makeLoadStoreByIdRepository = (): LoadStoreByIdRepository => {
  class LoadStoreByIdRepositoryStub implements LoadStoreByIdRepository {
    async loadStoreById (id: number): Promise<StoreModel | null> {
      return new Promise(resolve => resolve(mockFakeStore()))
    }
  }
  return new LoadStoreByIdRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateStore
  updateStoreRepositoryStub: UpdateStoreRepository
  loadStoreByIdRepositoryStub: LoadStoreByIdRepository
}

const makeSut = (): SutTypes => {
  const updateStoreRepositoryStub = makeUpdateStoreRepository()
  const loadStoreByIdRepositoryStub = makeLoadStoreByIdRepository()
  const sut = new DbUpdateStore(updateStoreRepositoryStub, loadStoreByIdRepositoryStub)
  return {
    sut,
    updateStoreRepositoryStub,
    loadStoreByIdRepositoryStub
  }
}

describe('DbUpdateStore Usecase', () => {
  test('Should call UpdateStoreRepository with correct values', async () => {
    const { sut, updateStoreRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateStoreRepositoryStub, 'updateStore')
    const fakeStore = mockFakeStore()
    await sut.updateStore(fakeStore.id, fakeStore)
    expect(updateSpy).toHaveBeenCalledWith(1, fakeStore)
  })

  test('Should throw if UpdateRecipeRepository throws', async () => {
    const { sut, updateStoreRepositoryStub } = makeSut()
    const fakeStore = mockFakeStore()
    jest.spyOn(updateStoreRepositoryStub, 'updateStore').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.updateStore(fakeStore.id, fakeStore)
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadStoreByIdRepository with correct values', async () => {
    const { sut, loadStoreByIdRepositoryStub } = makeSut()
    const fakeStore = mockFakeStore()
    const updateSpy = jest.spyOn(loadStoreByIdRepositoryStub, 'loadStoreById')
    await sut.updateStore(fakeStore.id, fakeStore)
    expect(updateSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if LoadStoreByIdRepository throws', async () => {
    const { sut, loadStoreByIdRepositoryStub } = makeSut()
    const fakeStore = mockFakeStore()
    jest.spyOn(loadStoreByIdRepositoryStub, 'loadStoreById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.updateStore(fakeStore.id, fakeStore)
    await expect(promise).rejects.toThrow()
  })
})
