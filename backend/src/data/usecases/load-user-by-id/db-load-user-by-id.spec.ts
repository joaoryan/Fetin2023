/* eslint-disable no-undef */
import { DbLoadUserById } from './db-load-user-by-id'
import { LoadUserByIdRepository } from '../../protocols/db/user/load-user-by-id-repository'
import { UserModel } from '../add-user/db-add-user-protocols'
import { mockReturnUser } from '../../../domain/mocks/user'

const makeLoadUserByTokenRepository = (): LoadUserByIdRepository => {
  class LoadUsertByIdRepositoryStub implements LoadUserByIdRepository {
    async loadById (id: number): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new LoadUsertByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadUserById
  loadUserByIdRepositoryStub: LoadUserByIdRepository
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = makeLoadUserByTokenRepository()
  const sut = new DbLoadUserById(loadUserByIdRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub
  }
}

describe('DbVerifyToken usecase', () => {
  test('Should call LoadUserByIdRepository with correct values', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.load(1)
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should return null if LoadUserByIdRepository returns null', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load(1)
    expect(account).toBeNull()
  })

  test('Should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load(1)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load(1)
    expect(account).toEqual(mockReturnUser())
  })
})
