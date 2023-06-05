import { describe, test, expect, jest } from '@jest/globals'
import { DbLoadUserOldByEmail } from './db-load-userOld-by-email'
import { LoadUserOldByEmailRepository } from '../../protocols/db/user/load-userOld-by-email-repository'
import { UserOldModel } from '../../../domain/models/userOld'
import { mockReturnUserOld } from '../../../domain/mocks/user-old'

class LoadUserOldByEmailRepositoryStub implements LoadUserOldByEmailRepository {
  async loadUserOldByEmail (email: string): Promise<UserOldModel | null> {
    return mockReturnUserOld()
  }
}

type SutTypes = {
  sut: DbLoadUserOldByEmail
  loadUserOldByEmailRepositoryStub: LoadUserOldByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadUserOldByEmailRepositoryStub = new LoadUserOldByEmailRepositoryStub()
  const sut = new DbLoadUserOldByEmail(loadUserOldByEmailRepositoryStub)
  return {
    sut,
    loadUserOldByEmailRepositoryStub
  }
}

describe('Testing the LoadUseroldByEmail class', () => {
  test('should call the loadUserOldByEmail method only once', async () => {
    const { sut, loadUserOldByEmailRepositoryStub } = makeSut()
    const loadUserOldByEmailRepositorySpy = jest.spyOn(loadUserOldByEmailRepositoryStub, 'loadUserOldByEmail')
    await sut.loadUser('valid_email@mail.com')
    expect(loadUserOldByEmailRepositorySpy).toHaveBeenCalledTimes(1)
  })
  test('should call the loadUserByEmail method with the correct parameter', async () => {
    const { sut, loadUserOldByEmailRepositoryStub } = makeSut()
    const loadUserOldByEmailRepositorySpy = jest.spyOn(loadUserOldByEmailRepositoryStub, 'loadUserOldByEmail')
    await sut.loadUser('valid_email@mail.com')
    expect(loadUserOldByEmailRepositorySpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
  test('should return a user in case of success', async () => {
    const { sut } = makeSut()
    const user = await sut.loadUser('valid_email@mail.com')
    expect(user).toEqual(mockReturnUserOld())
  })
  test('should return null if it cannot find the user', async () => {
    const { sut, loadUserOldByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserOldByEmailRepositoryStub, 'loadUserOldByEmail').mockResolvedValue(null)
    const user = await sut.loadUser('valid_email@mail.com')
    expect(user).toEqual(null)
  })
  test('should throw an exception if the loadUserByEmail method fails', async () => {
    const { sut, loadUserOldByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserOldByEmailRepositoryStub, 'loadUserOldByEmail').mockRejectedValue(new Error())
    await expect(sut.loadUser('valid_email@mail.com')).rejects.toThrow()
  })
})
