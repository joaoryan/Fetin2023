/* eslint-disable no-undef */
import { UserModel, AddUserModel, Hasher, AddUserRepository, CreateCodeRandom } from './db-add-user-protocols'
import { DbAddUser } from './db-add-user'
import { LoadUserByEmailRepository } from '../../protocols/db/user/load-user-by-email-repository'
import { mockAddUser, mockReturnUser } from '../../../domain/mocks/user'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeCodeRandom = (): CreateCodeRandom => {
  class CodeRandomStub implements CreateCodeRandom {
    async codeRandom (): Promise<string> {
      return new Promise(resolve => resolve('pinIOK'))
    }
  }
  return new CodeRandomStub()
}

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<UserModel | null> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeAddUserRepository = (): AddUserRepository => {
  class AddAcountRepositoryStub implements AddUserRepository {
    async add (accountData: AddUserModel): Promise<UserModel> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new AddAcountRepositoryStub()
}

interface SutTypes {
  sut: DbAddUser
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hasherStub: Hasher
  addUserRepositoryStub: AddUserRepository
  codeRandomStub: CreateCodeRandom
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const codeRandomStub = makeCodeRandom()
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepository()
  const addUserRepositoryStub = makeAddUserRepository()
  const sut = new DbAddUser(hasherStub, addUserRepositoryStub, loadUserByEmailRepositoryStub, codeRandomStub)
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hasherStub,
    addUserRepositoryStub,
    codeRandomStub
  }
}

describe('DbAddAccouont', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(await mockAddUser())
    expect(hasherSpy).toHaveBeenCalledWith('hashed_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValue(new Error())
    const promise = sut.add(await mockAddUser())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    const user = await mockAddUser()
    await sut.add(user)
    expect(addSpy).toHaveBeenCalledWith(user)
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockRejectedValue(new Error())
    const promise = sut.add(await mockAddUser())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const user = await sut.add(await mockAddUser())
    expect(user).toEqual(mockReturnUser())
  })

  test('Should return an null if LoadAccountByEmailRepository returns an account', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(mockReturnUser())))
    const user = await sut.add(await mockAddUser())
    expect(user).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.add(await mockAddUser())
    expect(loadSpy).toHaveBeenCalledWith('user_email@mail.com')
  })
})
