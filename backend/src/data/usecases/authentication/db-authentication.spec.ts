/* eslint-disable no-undef */
import { DbAuthentication } from './db-authentication'
import {
  LoadUserByEmailRepository,
  HashComparer,
  Encrypter,
  UserModel,
  UpdateAccessTokenRepository
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

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: number): Promise<string> {
      return new Promise(resolve => resolve('generated_token'))
    }
  }
  return new EncrypterStub()
}

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new LoadUserByEmailRepositoryStub()
}

const mekeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: number, accessToken: string): Promise<void | null> {
      return null
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  UpdateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepository()
  const hashComparerStub = makeHashCompare()
  const encrypterStub = makeEncrypter()
  const UpdateAccessTokenRepositoryStub = mekeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    UpdateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    UpdateAccessTokenRepositoryStub
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

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth((await makeFakeRequestLogin()).body)
    expect(accessToken).toBeNull()
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
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth((await makeFakeRequestLogin()).body)
    expect(encryptSpy).toHaveBeenCalledWith(1)
  })

  test('Should return throw if Encrypter returns throw', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth((await makeFakeRequestLogin()).body)
    expect(promise).rejects.toThrow()
  })

  test('Should return a access token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth((await makeFakeRequestLogin()).body)
    expect(accessToken).toEqual('generated_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, UpdateAccessTokenRepositoryStub } = makeSut()
    const UpdateSpy = jest.spyOn(UpdateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth((await makeFakeRequestLogin()).body)
    expect(UpdateSpy).toHaveBeenCalledWith(1, 'generated_token')
  })

  test('Should return throw if UpdateAccessTokenRepository returns throw', async () => {
    const { sut, UpdateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(UpdateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth((await makeFakeRequestLogin()).body)
    expect(promise).rejects.toThrow()
  })
})
