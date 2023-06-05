import { describe, test, expect, jest } from '@jest/globals'
import { DbLoadUserByCorporateName } from './db-load-user-by-corporateName'
import { UserModel } from '../../../domain/models/user'
import { mockReturnUser } from '../../../domain/mocks/user'
import { LoadUserByCorporateNameRepository } from '../../protocols/db/user/load-user-by-corporateName-repository'

class LoadUserByCorporateNameRepositoryStub implements LoadUserByCorporateNameRepository {
  async loadUserByCorporateName (corporateName: string): Promise<UserModel | null> {
    return mockReturnUser()
  }
}

type SutTypes = {
  sut: DbLoadUserByCorporateName
  loadUserByCorporateNameRepositoryStub: LoadUserByCorporateNameRepository
}

const makeSut = (): SutTypes => {
  const loadUserByCorporateNameRepositoryStub = new LoadUserByCorporateNameRepositoryStub()
  const sut = new DbLoadUserByCorporateName(loadUserByCorporateNameRepositoryStub)
  return {
    sut,
    loadUserByCorporateNameRepositoryStub
  }
}

describe('Testing the LoadUserByCorporateName class', () => {
  test('should call the loadUserByCorporateName method only once', async () => {
    const { sut, loadUserByCorporateNameRepositoryStub } = makeSut()
    const loadUserByEmailRepositorySpy = jest.spyOn(loadUserByCorporateNameRepositoryStub, 'loadUserByCorporateName')
    await sut.loadUser('user_email@mail.com')
    expect(loadUserByEmailRepositorySpy).toHaveBeenCalledTimes(1)
  })
  test('should call the loadUserByCorporateName method with the correct parameter', async () => {
    const { sut, loadUserByCorporateNameRepositoryStub } = makeSut()
    const loadUserByEmailRepositorySpy = jest.spyOn(loadUserByCorporateNameRepositoryStub, 'loadUserByCorporateName')
    await sut.loadUser('user_email@mail.com')
    expect(loadUserByEmailRepositorySpy).toHaveBeenCalledWith('user_email@mail.com')
  })
  test('should return a user in case of success', async () => {
    const { sut } = makeSut()
    const user = await sut.loadUser('user_email@mail.com')
    expect(user).toEqual(mockReturnUser())
  })
  test('should return null if it cannot find the user', async () => {
    const { sut, loadUserByCorporateNameRepositoryStub } = makeSut()
    jest.spyOn(loadUserByCorporateNameRepositoryStub, 'loadUserByCorporateName').mockResolvedValue(null)
    const user = await sut.loadUser('user_email@mail.com')
    expect(user).toEqual(null)
  })
  test('should throw an exception if the loadUserByCorporateName method fails', async () => {
    const { sut, loadUserByCorporateNameRepositoryStub } = makeSut()
    jest.spyOn(loadUserByCorporateNameRepositoryStub, 'loadUserByCorporateName').mockRejectedValue(new Error())
    await expect(sut.loadUser('user_email@mail.com')).rejects.toThrow()
  })
})
