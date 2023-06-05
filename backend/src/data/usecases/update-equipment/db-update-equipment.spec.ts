import { describe, test, expect, jest } from '@jest/globals'
import { DbUpdateEquipment } from './db-update-equipment'
import { UpdateEquipmentRepository } from '../../protocols/db/equipment/update-equipment-repository'
import { mockUpdateEquipmentRequest } from './../../../domain/mocks/equipment/index'
import { UpdateEquipment } from '../../../domain/usecases/update-equipment'

class UpdateEquipmentRepositoryStub implements UpdateEquipmentRepository {
  async updateEquipment (id: number, equipment: UpdateEquipmentRepository.Parameter): Promise<boolean> {
    return true
  }
}

type SutTypes = {
  sut: UpdateEquipment
  repositoryStub: UpdateEquipmentRepository
}

const makeSut = (): SutTypes => {
  const repositoryStub = new UpdateEquipmentRepositoryStub()
  const sut = new DbUpdateEquipment(repositoryStub)
  return {
    sut,
    repositoryStub
  }
}

describe('Testing the DbUpdateEquipment class', () => {
  describe('Dependency with UpdateEquipmentRepository class', () => {
    test('should call the updateEquipment method only once', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'updateEquipment')
      const { body, params } = mockUpdateEquipmentRequest(1)
      await sut.update(params.id!, body.equipment!)
      expect(repositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the updateEquipment method with the correct parameter', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'updateEquipment')
      const { body, params } = mockUpdateEquipmentRequest(1)
      await sut.update(params.id!, body.equipment!)
      expect(repositorySpy).toHaveBeenCalledWith(params.id!, body.equipment!)
    })
    test('should return true if the updateEquipment method returns true', async () => {
      const { sut } = makeSut()
      const { body, params } = mockUpdateEquipmentRequest(1)
      const result = await sut.update(params.id!, body.equipment!)
      expect(result).toBeTruthy()
    })
    test('should return false if the updateEquipment method returns false', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'updateEquipment').mockResolvedValue(false)
      const { body, params } = mockUpdateEquipmentRequest(1)
      const result = await sut.update(params.id!, body.equipment!)
      expect(result).toBeFalsy()
    })
    test('should throw an exception if the updateEquipment method fails', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'updateEquipment').mockRejectedValue(new Error())
      const { body, params } = mockUpdateEquipmentRequest(1)
      await expect(sut.update(params.id!, body.equipment!)).rejects.toThrow()
    })
  })
})
