import { describe, test, expect, jest } from '@jest/globals'
import { DbLoadUserByEmail } from './db-load-user-by-email'
import { LoadUserByEmailRepository } from '../../protocols/db/user/load-user-by-email-repository'
import { UserModel } from '../add-user/db-add-user-protocols'
import { mockReturnUser } from '../../../domain/mocks/user'

class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
  async loadByEmail (email: string): Promise<UserModel | null> {
    return mockReturnUser()
  }
}

type SutTypes = {
  sut: DbLoadUserByEmail
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = new LoadUserByEmailRepositoryStub()
  const sut = new DbLoadUserByEmail(loadUserByEmailRepositoryStub)
  return {
    sut,
    loadUserByEmailRepositoryStub
  }
}

describe('Testing the LoadUserByEmail class', () => {
  describe('Dependency with loadUserByEmailRepository class', () => {
    test('should call the loadUserByEmail method only once', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut()
      const loadEquipByIdRepositorySpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
      await sut.loadUser('valid_email@mail.com')
      expect(loadEquipByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the loadUserByEmail method with the correct parameter', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut()
      const loadEquipByIdRepositorySpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
      await sut.loadUser('valid_email@mail.com')
      expect(loadEquipByIdRepositorySpy).toHaveBeenCalledWith('valid_email@mail.com')
    })
    test('should return a user in case of success', async () => {
      const { sut } = makeSut()
      const equipment = await sut.loadUser('valid_email@mail.com')
      expect(equipment).toEqual(mockReturnUser())
    })
    test('should return null if it cannot find the user', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValue(null)
      const equipment = await sut.loadUser('valid_email@mail.com')
      expect(equipment).toEqual(null)
    })
    test('should throw an exception if the loadUserByEmail method fails', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockRejectedValue(new Error())
      await expect(sut.loadUser('valid_email@mail.com')).rejects.toThrow()
    })
  })
})
