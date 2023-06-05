/* eslint-disable no-undef */
import { DbLoadStoresByCompanyId } from './db-load-store-by-company-id'
import { LoadStoresByCompanyIdRepository } from '../../protocols/db/store/load-stores-by-company-id-repository'
import { StoreModel } from '../add-store/db-add-store-protocols'
import { mockLoadStoreByIdResponse, mockLoadStoresByCompanyIdResponse } from '../../../domain/mocks/store'
import { LoadStoresByUserRepository } from '../../protocols/db/store/load-stores-by-user-repository'

const makeLoadStoreByCompanyIdRepository = (): LoadStoresByCompanyIdRepository => {
  class LoadStoreByCompanyIdRepositoryStub implements LoadStoresByCompanyIdRepository {
    async loadStoresByCompanyId (id: number): Promise<StoreModel[] | null> {
      return new Promise(resolve => resolve(mockLoadStoresByCompanyIdResponse()))
    }
  }
  return new LoadStoreByCompanyIdRepositoryStub()
}

class LoadStoresByUserRepositoryStub implements LoadStoresByUserRepository {
  async loadStoresByUser (idUser: number): Promise<StoreModel[] | null> {
    return new Promise(resolve => resolve([mockLoadStoreByIdResponse()]))
  }
}

interface SutTypes {
  sut: DbLoadStoresByCompanyId
  loadStoreByCompanyIdRepositoryStub: LoadStoresByCompanyIdRepository
  loadStoresByUserRepositoryStub: LoadStoresByUserRepository
}

const makeSut = (): SutTypes => {
  const loadStoreByCompanyIdRepositoryStub = makeLoadStoreByCompanyIdRepository()
  const loadStoresByUserRepositoryStub = new LoadStoresByUserRepositoryStub()
  const sut = new DbLoadStoresByCompanyId(loadStoreByCompanyIdRepositoryStub, loadStoresByUserRepositoryStub)
  return {
    sut,
    loadStoreByCompanyIdRepositoryStub,
    loadStoresByUserRepositoryStub
  }
}

describe('DbLoadStoresByCompanyId usecase', () => {
  test('Should call LoadStoreByCompanyId with correct values', async () => {
    const { sut, loadStoreByCompanyIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadStoreByCompanyIdRepositoryStub, 'loadStoresByCompanyId')
    await sut.loadStoresByCompanyId(1, 1, 'admCli')
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should return null is LoadStoreByCompanyId returns null', async () => {
    const { sut, loadStoreByCompanyIdRepositoryStub } = makeSut()
    jest.spyOn(loadStoreByCompanyIdRepositoryStub, 'loadStoresByCompanyId').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const store = await sut.loadStoresByCompanyId(1, 1, 'admCli')
    expect(store).toBeNull()
  })

  test('Should throw if LoadStoreByCompanyId throws', async () => {
    const { sut, loadStoreByCompanyIdRepositoryStub } = makeSut()
    jest.spyOn(loadStoreByCompanyIdRepositoryStub, 'loadStoresByCompanyId').mockRejectedValue(new Error())
    await expect(sut.loadStoresByCompanyId(1, 1, 'admCli')).rejects.toThrow()
  })

  test('Should return at least one store on success', async () => {
    const { sut } = makeSut()
    const store = await sut.loadStoresByCompanyId(1, 1, 'admCli')
    expect(store).toEqual(mockLoadStoresByCompanyIdResponse())
  })
})
