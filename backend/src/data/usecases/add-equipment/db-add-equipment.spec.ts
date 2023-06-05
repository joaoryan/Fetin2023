import { describe, test, expect, jest } from '@jest/globals'
import { DbAddEquipment } from './db-add-equipment'
import { AddEquipmentRepository } from '../../protocols/db/equipment/add-equipment-repository'
import { mockAddEquipmentRequest, mockAddEquipmentResponse } from './../../../domain/mocks/equipment/index'
import { CreateCodeRandom } from '../add-user/db-add-user-protocols'

class AddEquipmentRepositoryStub implements AddEquipmentRepository {
  async addEquipment (equipment: AddEquipmentRepository.Parameter): Promise<AddEquipmentRepository.Result> {
    return mockAddEquipmentResponse()
  }
}

class CodeRandomStub implements CreateCodeRandom {
  async codeRandom (): Promise<string> {
    return new Promise(resolve => resolve('iokPin'))
  }
}

type SutTypes = {
  sut: DbAddEquipment
  addEquipmentRepositoryStub: AddEquipmentRepositoryStub
  codeRandomStub: CreateCodeRandom
}

const makeSut = (): SutTypes => {
  const addEquipmentRepositoryStub = new AddEquipmentRepositoryStub()
  const codeRandomStub = new CodeRandomStub()
  const sut = new DbAddEquipment(addEquipmentRepositoryStub, codeRandomStub)
  return {
    sut,
    addEquipmentRepositoryStub,
    codeRandomStub
  }
}

describe('Testing the DbAddEquipment class', () => {
  describe('Dependency with AddEquipmentRepository class', () => {
    test('should call the addEquipment method only once', async () => {
      const { sut, addEquipmentRepositoryStub } = makeSut()
      const addEquipmentRepositorySpy = jest.spyOn(addEquipmentRepositoryStub, 'addEquipment')
      const equipment = mockAddEquipmentRequest()
      await sut.add(equipment.body)
      expect(addEquipmentRepositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the addEquipment method with the correct parameter', async () => {
      const { sut, addEquipmentRepositoryStub } = makeSut()
      const addEquipmentRepositorySpy = jest.spyOn(addEquipmentRepositoryStub, 'addEquipment')
      const equipment = mockAddEquipmentRequest()
      await sut.add(equipment.body)
      expect(addEquipmentRepositorySpy).toHaveBeenCalledWith(equipment.body)
    })
    test('should return a new equipment in case of success', async () => {
      const { sut } = makeSut()
      const equipment = mockAddEquipmentRequest()
      const equipmentResponse = await sut.add(equipment.body)
      expect(equipmentResponse).toEqual(mockAddEquipmentResponse())
    })
    test('should throw an exception if the addEquipment method fails', async () => {
      const { sut, addEquipmentRepositoryStub } = makeSut()
      jest.spyOn(addEquipmentRepositoryStub, 'addEquipment').mockRejectedValue(new Error())
      const equipment = mockAddEquipmentRequest()
      await expect(sut.add(equipment.body)).rejects.toThrow()
    })
  })
})
