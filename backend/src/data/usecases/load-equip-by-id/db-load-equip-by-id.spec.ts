import { describe, test, expect, jest } from '@jest/globals'
import { LoadEquipByIdRepository } from '../../protocols/db/equipment/load-equip-by-id-repository'
import { mockLoadEquipByIdResponse } from '../../../domain/mocks/equipment'
import { DbLoadEquipById } from './db-load-equip-by-id'

class LoadEquipByIdRepositoryStub implements LoadEquipByIdRepository {
  async loadEquipById (id: number): Promise<LoadEquipByIdRepository.Result> {
    return mockLoadEquipByIdResponse()
  }
}

type SutTypes = {
  sut: DbLoadEquipById
  loadEquipByIdRepositoryStub: LoadEquipByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadEquipByIdRepositoryStub = new LoadEquipByIdRepositoryStub()
  const sut = new DbLoadEquipById(loadEquipByIdRepositoryStub)
  return {
    sut,
    loadEquipByIdRepositoryStub
  }
}

describe('Testing the LoadEquipById class', () => {
  describe('Dependency with LoadEquipByIdRepository class', () => {
    test('should call the loadEquipById method only once', async () => {
      const { sut, loadEquipByIdRepositoryStub } = makeSut()
      const loadEquipByIdRepositorySpy = jest.spyOn(loadEquipByIdRepositoryStub, 'loadEquipById')
      await sut.load(1)
      expect(loadEquipByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the loadEquipById method with the correct parameter', async () => {
      const { sut, loadEquipByIdRepositoryStub } = makeSut()
      const loadEquipByIdRepositorySpy = jest.spyOn(loadEquipByIdRepositoryStub, 'loadEquipById')
      await sut.load(1)
      expect(loadEquipByIdRepositorySpy).toHaveBeenCalledWith(1)
    })
    test('should return a equipment in case of success', async () => {
      const { sut } = makeSut()
      const equipment = await sut.load(1)
      expect(equipment).toEqual(mockLoadEquipByIdResponse())
    })
    test('should return null if it cannot find the equipment', async () => {
      const { sut, loadEquipByIdRepositoryStub } = makeSut()
      jest.spyOn(loadEquipByIdRepositoryStub, 'loadEquipById').mockResolvedValue(null)
      const equipment = await sut.load(1)
      expect(equipment).toEqual(null)
    })
    test('should throw an exception if the loadEquipById method fails', async () => {
      const { sut, loadEquipByIdRepositoryStub } = makeSut()
      jest.spyOn(loadEquipByIdRepositoryStub, 'loadEquipById').mockRejectedValue(new Error())
      await expect(sut.load(1)).rejects.toThrow()
    })
  })
})
