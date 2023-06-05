/* eslint-disable no-undef */
import { mockReturnUser, mockUpdateUser } from '../../../domain/mocks/user'
import { DbEditUserData } from './db-update-user-data'
import { UserModel, EditUserDataRepository, EditUserDataModel, LoadUserByIdRepository, Hasher } from './db-update-user-data-protocols'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeEditUserDataRepository = (): EditUserDataRepository => {
  class EditUserDataRepositoryStub implements EditUserDataRepository {
    async editUserData (userData: EditUserDataModel): Promise<UserModel> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new EditUserDataRepositoryStub()
}

const makeLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUsertByIdRepositoryStub implements LoadUserByIdRepository {
    async loadById (id: number): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new LoadUsertByIdRepositoryStub()
}

interface SutTypes {
  sut: DbEditUserData
  hasherStub: Hasher
  editUserDataRepositoryStub: EditUserDataRepository
  loadUserByIdRepositoryStub: LoadUserByIdRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const editUserDataRepositoryStub = makeEditUserDataRepository()
  const loadUserByIdRepositoryStub = makeLoadUserByIdRepository()
  const sut = new DbEditUserData(hasherStub, editUserDataRepositoryStub, loadUserByIdRepositoryStub)
  return {
    sut,
    hasherStub,
    editUserDataRepositoryStub,
    loadUserByIdRepositoryStub
  }
}

describe('DbEditUserData Usecase', () => {
  test('Should call EditUserDataRepository with correct values', async () => {
    const { sut, editUserDataRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(editUserDataRepositoryStub, 'editUserData')
    const user = await mockUpdateUser()
    await sut.editUserData(user)
    expect(addSpy).toHaveBeenCalledWith(user)
  })

  test('Should throw if EditUserDataRepository thows', async () => {
    const { sut, editUserDataRepositoryStub } = makeSut()
    jest.spyOn(editUserDataRepositoryStub, 'editUserData').mockRejectedValue(new Error())
    const promise = sut.editUserData(await mockUpdateUser())
    await expect(promise).rejects.toThrow()
  })
})
