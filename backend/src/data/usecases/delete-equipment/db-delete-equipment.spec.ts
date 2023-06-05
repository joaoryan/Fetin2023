import { describe, test, expect, jest } from '@jest/globals'
import { DeleteEquipmentRepository } from './../../protocols/db/equipment/delete-equipment-repository'
import { DbDeleteEquipment } from './db-delete-equipment'

class RepositoryStub implements DeleteEquipmentRepository {
  async deleteEquipment (id: number): Promise<boolean> {
    return true
  }
}

type SutTypes = {
  sut: DbDeleteEquipment
  repositoryStub: DeleteEquipmentRepository
}

const makeSut = (): SutTypes => {
  const repositoryStub = new RepositoryStub()
  const sut = new DbDeleteEquipment(repositoryStub)
  return { sut, repositoryStub }
}

describe('Testing the DbDeleteEquipment class', () => {
  describe('Dependency with DeleteEquipmentRepository class', () => {
    test('should call the deleteEquipment method only once', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'deleteEquipment')
      await sut.delete(1)
      expect(repositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the deleteEquipment method with the correct parameter', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'deleteEquipment')
      const id = 1
      await sut.delete(id)
      expect(repositorySpy).toHaveBeenCalledWith(id)
    })
    test('should return true if deleteEquipment returns true', async () => {
      const { sut } = makeSut()
      const result = await sut.delete(1)
      expect(result).toBeTruthy()
    })
    test('should return false if deleteEquipment returns false', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'deleteEquipment').mockResolvedValue(false)
      const result = await sut.delete(1)
      expect(result).toBeFalsy()
    })
    test('should throw an exception if the deleteEquipment method fails', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'deleteEquipment').mockRejectedValue(new Error())
      await expect(sut.delete(1)).rejects.toThrow()
    })
  })
})
