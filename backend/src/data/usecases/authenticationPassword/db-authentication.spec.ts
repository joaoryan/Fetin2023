/* eslint-disable no-undef */
import { DbAuthenticationPassword } from './db-authentication'
import {
  LoadUserByEmailRepository,
  HashComparer,
  UserModel
} from './db-authentication-protocols'
import { makeFakeRequestLogin, mockReturnUser } from '../../../domain/mocks/user'

const makeHashCompare = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new LoadUserByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbAuthenticationPassword
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashComparerStub: HashComparer
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepository()
  const hashComparerStub = makeHashCompare()

  const sut = new DbAuthenticationPassword(
    loadUserByEmailRepositoryStub,
    hashComparerStub
  )
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub
  }
}

describe('DbAuthentication usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.auth((await makeFakeRequestLogin()).body)
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth((await makeFakeRequestLogin()).body)
    await expect(promise).rejects.toThrow()
  })

  test('Should calls HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth((await makeFakeRequestLogin()).body)
    expect(compareSpy).toHaveBeenCalledWith('valid_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth((await makeFakeRequestLogin()).body)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth((await makeFakeRequestLogin()).body)
    expect(accessToken).toEqual(false)
  })

  test('Should return a access token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth((await makeFakeRequestLogin()).body)
    expect(accessToken).toEqual(true)
  })
})
