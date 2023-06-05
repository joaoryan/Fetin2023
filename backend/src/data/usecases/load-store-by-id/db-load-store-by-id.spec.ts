/* eslint-disable no-undef */
import { DbLoadStoreById } from './db-load-store-by-id'
import { LoadStoreByIdRepository } from '../../protocols/db/store/load-store-by-id-repository'
import { StoreModel } from '../add-store/db-add-store-protocols'
import { mockLoadStoreByIdResponse } from '../../../domain/mocks/store'

const makeLoadStoreByIdRepository = (): LoadStoreByIdRepository => {
  class LoadStoreByIdRepositoryStub implements LoadStoreByIdRepository {
    async loadStoreById (id: number): Promise<StoreModel | null> {
      return new Promise(resolve => resolve(mockLoadStoreByIdResponse()))
    }
  }
  return new LoadStoreByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadStoreById
  loadStoreByIdRepositoryStub: LoadStoreByIdRepository
}

const makeSut = (): SutTypes => {
  const loadStoreByIdRepositoryStub = makeLoadStoreByIdRepository()
  const sut = new DbLoadStoreById(loadStoreByIdRepositoryStub)
  return {
    sut,
    loadStoreByIdRepositoryStub
  }
}

describe('DbLoadStoreById usecase', () => {
  test('Should call LoadStoreById with correct values', async () => {
    const { sut, loadStoreByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadStoreByIdRepositoryStub, 'loadStoreById')
    await sut.loadStoreById(1)
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should return null if LoadUserById returns null', async () => {
    const { sut, loadStoreByIdRepositoryStub } = makeSut()
    jest.spyOn(loadStoreByIdRepositoryStub, 'loadStoreById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const store = await sut.loadStoreById(1)
    expect(store).toBeNull()
  })

  test('Should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadStoreByIdRepositoryStub } = makeSut()
    jest.spyOn(loadStoreByIdRepositoryStub, 'loadStoreById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadStoreById(1)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a store on success', async () => {
    const { sut } = makeSut()
    const store = await sut.loadStoreById(1)
    expect(store).toEqual(mockLoadStoreByIdResponse())
  })
})
