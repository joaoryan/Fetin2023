/* eslint-disable no-undef */
import { DbDeleteStore } from './db-delete-store'
import { StoreModel, LoadStoreByIdRepository, DeleteStoreRepository } from './db-delete-store-protocols'
import { mockFakeStore } from '../../../domain/mocks/store'

const makeFakeDeleteStore = (): any => ({ id: 1 })

const makeDeleteStoreRepository = (): DeleteStoreRepository => {
  class DeleteStoreRepositoryStub implements DeleteStoreRepository {
    deleteStore (id: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteStoreRepositoryStub()
}

const makeLoadStoreRepository = (): LoadStoreByIdRepository => {
  class LoadStoreByIdRepositoryStub implements LoadStoreByIdRepository {
    loadStoreById (id: number): Promise<StoreModel | null> {
      return new Promise(resolve => resolve(mockFakeStore()))
    }
  }
  return new LoadStoreByIdRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteStore
  loadStoreRepositoryStub: LoadStoreByIdRepository
  deleteStoreRepositoryStub: DeleteStoreRepository
}

const makeSut = (): SutTypes => {
  const loadStoreRepositoryStub = makeLoadStoreRepository()
  const deleteStoreRepositoryStub = makeDeleteStoreRepository()

  const sut = new DbDeleteStore(deleteStoreRepositoryStub, loadStoreRepositoryStub)
  return {
    sut,
    loadStoreRepositoryStub,
    deleteStoreRepositoryStub
  }
}

describe('DbDeleteStore Usecase', () => {
  test('Should call deleteStoreRepository with correct values', async () => {
    const { sut, deleteStoreRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(deleteStoreRepositoryStub, 'deleteStore')
    await sut.deleteStore(makeFakeDeleteStore())
    expect(addSpy).toHaveBeenCalledWith({ id: 1 })
  })

  test('Should throw if deleteStoreRepository throws', async () => {
    const { sut, deleteStoreRepositoryStub } = makeSut()
    jest.spyOn(deleteStoreRepositoryStub, 'deleteStore').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.deleteStore(makeFakeDeleteStore())
    await expect(promise).rejects.toThrow()
  })

  test('Should call loadStoreRepository with correct values', async () => {
    const { sut, loadStoreRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadStoreRepositoryStub, 'loadStoreById')
    await sut.deleteStore(makeFakeDeleteStore())
    expect(addSpy).toHaveBeenLastCalledWith({ id: 1 })
  })

  test('Should throw if loadStoreRepository throws', async () => {
    const { sut, loadStoreRepositoryStub } = makeSut()
    jest.spyOn(loadStoreRepositoryStub, 'loadStoreById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.deleteStore(makeFakeDeleteStore())
    await expect(promise).rejects.toThrow()
  })
})
