/* eslint-disable no-undef */
import { DbLoadConfigsByUserId } from './db-load-configs-by-user-id'
import { LoadConfigsByUserIdRepository } from '../../protocols/db/configs/load-configs-by-user-id-repository'
import { ConfigsModel } from '../../../domain/models/configs'

const makeFakeConfigs = (): ConfigsModel => ({
  id: 1,
  userId: 1,
  language: 'PT',
  tempUnit: '°C',
  weightUnit: 'KG',
  theme: 'Light'
})

const makeLoadConfigsByUserIdRepository = (): LoadConfigsByUserIdRepository => {
  class LoadConfigsByUserIdRepositoryStub implements LoadConfigsByUserIdRepository {
    async loadByUserId (id: number): Promise<ConfigsModel | null> {
      return new Promise(resolve => resolve(makeFakeConfigs()))
    }
  }
  return new LoadConfigsByUserIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadConfigsByUserId
  loadUserByIdRepositoryStub: LoadConfigsByUserIdRepository
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = makeLoadConfigsByUserIdRepository()
  const sut = new DbLoadConfigsByUserId(loadUserByIdRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub
  }
}

describe('DbVerifyToken usecase', () => {
  test('Should call LoadConfigsByUserIdRepository with correct values', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadByUserId')
    await sut.load(1)
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should return null if LoadConfigsByUserIdRepository returns null', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadByUserId').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load(1)
    expect(account).toBeNull()
  })

  test('Should throw if LoadConfigsByUserIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadByUserId').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load(1)
    await expect(promise).rejects.toThrow()
  })

  test('Should return user configs on success', async () => {
    const { sut } = makeSut()
    const configs = await sut.load(1)
    expect(configs).toEqual(makeFakeConfigs())
  })
})
