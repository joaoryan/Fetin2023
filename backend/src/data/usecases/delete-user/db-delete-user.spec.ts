import { describe, test, expect, jest } from '@jest/globals'
import { DeleteUserRepository } from '../../protocols/db/user/delete-user-repository'
import { DbDeleteUser } from './db-delete-user'

class RepositoryStub implements DeleteUserRepository {
  async deleteUser (id: number): Promise<boolean> {
    return true
  }
}

type SutTypes = {
  sut: DbDeleteUser
  repositoryStub: DeleteUserRepository
}

const makeSut = (): SutTypes => {
  const repositoryStub = new RepositoryStub()
  const sut = new DbDeleteUser(repositoryStub)
  return { sut, repositoryStub }
}

describe('Testing the DbDeleteUser class', () => {
  describe('Dependency with DeleteUserRepository class', () => {
    test('should call the deleteUser method only once', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'deleteUser')
      await sut.deleteUser(1)
      expect(repositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the deleteUser method with the correct parameter', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'deleteUser')
      const id = 1
      await sut.deleteUser(id)
      expect(repositorySpy).toHaveBeenCalledWith(id)
    })
    test('should return true if deleteUser returns true', async () => {
      const { sut } = makeSut()
      const result = await sut.deleteUser(1)
      expect(result).toBeTruthy()
    })
    test('should return false if deleteUser returns false', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'deleteUser').mockResolvedValue(false)
      const result = await sut.deleteUser(1)
      expect(result).toBeFalsy()
    })
    test('should throw an exception if the deleteUser method fails', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'deleteUser').mockRejectedValue(new Error())
      await expect(sut.deleteUser(1)).rejects.toThrow()
    })
  })
})
