import { describe, test, expect, jest } from '@jest/globals'
import { UpdateSoftwareRepository } from '../../protocols/db/update-software/update-software-repository'
import { mockResponse } from '../../../domain/mocks/update-software'
import { DbUpdateSoftware } from './db-update-software'

class UpdateSoftwareRepositoryStub implements UpdateSoftwareRepository {
  async updateSoftware (ovenModel: UpdateSoftwareRepository.Params, iokPin: string): Promise<UpdateSoftwareRepository.Result> {
    return mockResponse()
  }
}

type SutTypes = {
  sut: DbUpdateSoftware
  repositoryStub: UpdateSoftwareRepositoryStub
}

const makeSut = (): SutTypes => {
  const repositoryStub = new UpdateSoftwareRepositoryStub()
  const sut = new DbUpdateSoftware(repositoryStub)
  return {
    sut,
    repositoryStub
  }
}

describe('Testing the UpdateSoftware class', () => {
  describe('Dependency with UpdateSoftwareRepository class', () => {
    test('should call the UpdateSoftware method only once', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'updateSoftware')
      await sut.load('FIT', 'valid_PIN')
      expect(repositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the loadEquipById method with the correct parameter', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'updateSoftware')
      await sut.load('FIT', 'valid_PIN')
      expect(repositorySpy).toHaveBeenCalledWith('FIT', 'valid_PIN')
    })
    test('should return a path in case of success', async () => {
      const { sut } = makeSut()
      const equipment = await sut.load('FIT', 'valid_PIN')
      expect(equipment).toEqual(mockResponse())
    })
    test('should return a empty string if it cannot find the file', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'updateSoftware').mockResolvedValue('')
      const equipment = await sut.load('FIT', 'valid_PIN')
      expect(equipment).toEqual('')
    })
    test('should throw an exception if the UpdateSoftware method fails', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'updateSoftware').mockRejectedValue(new Error())
      await expect(sut.load('FIT', 'valid_PIN')).rejects.toThrow()
    })
  })
})
