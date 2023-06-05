/* eslint-disable no-undef */
import { DbLoadAccountByToken } from './db-load-user-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadUserByTokenRepository } from '../../protocols/db/user/load-user-by-token-repository'
import { UserModel } from '../add-user/db-add-user-protocols'
import { mockReturnUser } from '../../../domain/mocks/user'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<any> {
      return new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeLoadUserByTokenRepository = (): LoadUserByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadUserByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<UserModel> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadUserByTokenRepositoryStub: LoadUserByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadUserByTokenRepositoryStub = makeLoadUserByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadUserByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadUserByTokenRepositoryStub
  }
}

describe('DbVerifyToken usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadUserByTokenRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadUserByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadUserByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadUserByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadUserByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(mockReturnUser())
  })
})
