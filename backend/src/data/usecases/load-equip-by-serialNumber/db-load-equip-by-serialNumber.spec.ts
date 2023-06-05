import { describe, test, expect, jest } from '@jest/globals'
import { mockLoadEquipBySerialNumberResponse } from '../../../domain/mocks/equipment'
import { DbLoadEquipBySerialNumber } from './db-load-equip-by-serialNumber'
import { LoadEquipBySerialNumberRepository } from '../../protocols/db/equipment/load-equip-by-serialNumber-repository'
import { EquipModel } from '../load-equip-by-menu/db-load-equip-by-menu-protocols'

class LoadEquipBySerialNumberRepositoryStub implements LoadEquipBySerialNumberRepository {
  async loadEquipBySerialNumber (serialNumber: string): Promise<EquipModel> {
    return mockLoadEquipBySerialNumberResponse()
  }
}

type SutTypes = {
  sut: DbLoadEquipBySerialNumber
  loadEquipBySerialNumberRepositoryStub: LoadEquipBySerialNumberRepository
}

const makeSut = (): SutTypes => {
  const loadEquipBySerialNumberRepositoryStub = new LoadEquipBySerialNumberRepositoryStub()
  const sut = new DbLoadEquipBySerialNumber(loadEquipBySerialNumberRepositoryStub)
  return {
    sut,
    loadEquipBySerialNumberRepositoryStub
  }
}

describe('Testing the LoadEquipById class', () => {
  describe('Dependency with LoadEquipByIdRepository class', () => {
    test('should call the loadEquipById method only once', async () => {
      const { sut, loadEquipBySerialNumberRepositoryStub } = makeSut()
      const loadEquipByIdRepositorySpy = jest.spyOn(loadEquipBySerialNumberRepositoryStub, 'loadEquipBySerialNumber')
      await sut.loadEquip('valid_serial')
      expect(loadEquipByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the loadEquipById method with the correct parameter', async () => {
      const { sut, loadEquipBySerialNumberRepositoryStub } = makeSut()
      const loadEquipByIdRepositorySpy = jest.spyOn(loadEquipBySerialNumberRepositoryStub, 'loadEquipBySerialNumber')
      await sut.loadEquip('valid_serial')
      expect(loadEquipByIdRepositorySpy).toHaveBeenCalledWith('valid_serial')
    })
    test('should return a equipment in case of success', async () => {
      const { sut } = makeSut()
      const equipment = await sut.loadEquip('valid_serial')
      expect(equipment).toEqual(mockLoadEquipBySerialNumberResponse())
    })
    test('should return null if it cannot find the equipment', async () => {
      const { sut, loadEquipBySerialNumberRepositoryStub } = makeSut()
      jest.spyOn(loadEquipBySerialNumberRepositoryStub, 'loadEquipBySerialNumber').mockResolvedValue(null)
      const equipment = await sut.loadEquip('valid_serial')
      expect(equipment).toEqual(null)
    })
    test('should throw an exception if the loadEquipById method fails', async () => {
      const { sut, loadEquipBySerialNumberRepositoryStub } = makeSut()
      jest.spyOn(loadEquipBySerialNumberRepositoryStub, 'loadEquipBySerialNumber').mockRejectedValue(new Error())
      await expect(sut.loadEquip('valid_serial')).rejects.toThrow()
    })
  })
})
