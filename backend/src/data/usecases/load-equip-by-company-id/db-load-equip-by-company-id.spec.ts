import { LoadEquipByCompanyIdRepository } from '../../protocols/db/equipment/load-equip-by-company-id-repository'
import { describe, test, expect, jest } from '@jest/globals'
import { mockLoadEquipByCompanyIdResponse } from '../../../domain/mocks/equipment'
import { DbLoadEquipByCompanyId } from './db-load-equip-by-company-id'
import { LoadEquipByUserIdRepository } from '../../protocols/db/equipment/load-equip-by-user-id-repository'

class LoadEquipByCompanyIdRepositoryStub implements LoadEquipByCompanyIdRepository {
  async loadEquipByCompanyId (companyId: number): Promise<LoadEquipByCompanyIdRepository.Result> {
    return mockLoadEquipByCompanyIdResponse()
  }
}

class LoadEquipByUserIdRepositoryStub implements LoadEquipByUserIdRepository {
  async loadEquipByUserId (userId: number): Promise<LoadEquipByUserIdRepository.Result> {
    return mockLoadEquipByCompanyIdResponse()
  }
}

type SutTypes = {
  sut: DbLoadEquipByCompanyId
  loadEquipByCompanyIdRepositoryStub: LoadEquipByCompanyIdRepositoryStub
  loadEquipByUserIdRepositoryStub: LoadEquipByUserIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadEquipByCompanyIdRepositoryStub = new LoadEquipByCompanyIdRepositoryStub()
  const loadEquipByUserIdRepositoryStub = new LoadEquipByUserIdRepositoryStub()
  const sut = new DbLoadEquipByCompanyId(loadEquipByCompanyIdRepositoryStub, loadEquipByUserIdRepositoryStub)
  return {
    sut,
    loadEquipByCompanyIdRepositoryStub,
    loadEquipByUserIdRepositoryStub
  }
}

describe('Testing the LoadEquipByCompanyId class', () => {
  describe('Dependency with LoadEquipByCompanyIdRepository class', () => {
    test('should call the loadEquipByCompanyId method only once', async () => {
      const { sut, loadEquipByCompanyIdRepositoryStub } = makeSut()
      const loadEquipByCompanyIdRepositorySpy = jest.spyOn(loadEquipByCompanyIdRepositoryStub, 'loadEquipByCompanyId')
      await sut.load(1, 1, 'admCli')
      expect(loadEquipByCompanyIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the loadEquipByCompanyId method with the correct parameter', async () => {
      const { sut, loadEquipByCompanyIdRepositoryStub } = makeSut()
      const loadEquipByCompanyIdRepositorySpy = jest.spyOn(loadEquipByCompanyIdRepositoryStub, 'loadEquipByCompanyId')
      await sut.load(1, 1, 'admCli')
      expect(loadEquipByCompanyIdRepositorySpy).toHaveBeenCalledWith(1)
    })
    test('should return a list of equipment in case of success', async () => {
      const { sut } = makeSut()
      const equipmentList = await sut.load(1, 1, 'admCli')
      expect(equipmentList).toEqual(mockLoadEquipByCompanyIdResponse())
    })
    test('should throw an exception if the loadEquipByCompanyId method fails', async () => {
      const { sut, loadEquipByCompanyIdRepositoryStub } = makeSut()
      jest.spyOn(loadEquipByCompanyIdRepositoryStub, 'loadEquipByCompanyId').mockRejectedValue(new Error())
      await expect(sut.load(1, 1, 'admCli')).rejects.toThrow()
    })
  })
})
