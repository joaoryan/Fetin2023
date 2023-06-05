import { describe, test, expect, jest } from '@jest/globals'
import { CountEquipment } from '../../../domain/usecases/count-equipment'
import { CountEquipmentRepository } from './../../protocols/db/equipment/count-equipment-repository'
import { mockCountEquipmentRequest, mockCountEquipmentResponse } from './../../../domain/mocks/equipment'
import { DbCountEquipment } from './db-count-equipment'

class RepositoryStub implements CountEquipmentRepository {
  async countEquipment (where?: CountEquipment.Parameter | undefined): Promise<CountEquipment.Response> {
    return mockCountEquipmentResponse()
  }
}

type SutTypes = {
  sut: DbCountEquipment
  repositoryStub: CountEquipmentRepository
}

const makeSut = (): SutTypes => {
  const repositoryStub = new RepositoryStub()
  const sut = new DbCountEquipment(repositoryStub)
  return { sut, repositoryStub }
}

describe('Testing the DbCountEquipment class', () => {
  describe('Dependency with CountEquipmentRepository class', () => {
    test('should call the countEquipment method only once', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'countEquipment')
      await sut.count(mockCountEquipmentRequest().query.where)
      expect(repositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the countEquipment method with the correct parameter (where)', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'countEquipment')
      const { where } = mockCountEquipmentRequest().query
      await sut.count(where)
      expect(repositorySpy).toHaveBeenCalledWith(where)
    })
    test('should call the countEquipment method with the correct parameter (undefined)', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'countEquipment')
      await sut.count(undefined)
      expect(repositorySpy).toHaveBeenCalledWith(undefined)
    })
    test('should return an object with the prop count on success (where)', async () => {
      const { sut } = makeSut()
      const { where } = mockCountEquipmentRequest().query
      const result = await sut.count(where)
      expect(result).toEqual(mockCountEquipmentResponse())
    })
    test('should return an object with the prop count on success (undefined)', async () => {
      const { sut } = makeSut()
      const result = await sut.count(undefined)
      expect(result).toEqual(mockCountEquipmentResponse())
    })
    test('should throw an exception if the countEquipment method fails', async () => {
      const { sut, repositoryStub } = makeSut()
      const { where } = mockCountEquipmentRequest().query
      jest.spyOn(repositoryStub, 'countEquipment').mockRejectedValue(new Error())
      await expect(sut.count(where)).rejects.toThrow()
    })
  })
})
