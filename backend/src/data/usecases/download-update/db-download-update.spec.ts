import { describe, test, expect, jest } from '@jest/globals'
import { DownloadUpdateRepository } from '../../protocols/db/download-update/download-update-repository'
import { mockResponse } from '../../../domain/mocks/download-update'
import { DbDownloadUpdate } from './db-download-update'

class DownloadUpdateRepositoryStub implements DownloadUpdateRepository {
  async downloadUpdate (ovenModel: DownloadUpdateRepository.Params): Promise<DownloadUpdateRepository.Result> {
    return mockResponse()
  }
}

type SutTypes = {
  sut: DbDownloadUpdate
  repositoryStub: DownloadUpdateRepositoryStub
}

const makeSut = (): SutTypes => {
  const repositoryStub = new DownloadUpdateRepositoryStub()
  const sut = new DbDownloadUpdate(repositoryStub)
  return {
    sut,
    repositoryStub
  }
}

describe('Testing the DownloadUpdate class', () => {
  describe('Dependency with DownloadUpdateRepository class', () => {
    test('should call the downloadUpdate method only once', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'downloadUpdate')
      await sut.load('FIT')
      expect(repositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the loadEquipById method with the correct parameter', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'downloadUpdate')
      await sut.load('FIT')
      expect(repositorySpy).toHaveBeenCalledWith('FIT')
    })
    test('should return a path in case of success', async () => {
      const { sut } = makeSut()
      const equipment = await sut.load('FIT')
      expect(equipment).toEqual(mockResponse())
    })
    test('should return a empty string if it cannot find the file', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'downloadUpdate').mockResolvedValue('')
      const equipment = await sut.load('FIT')
      expect(equipment).toEqual('')
    })
    test('should throw an exception if the downloadUpdate method fails', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'downloadUpdate').mockRejectedValue(new Error())
      await expect(sut.load('FIT')).rejects.toThrow()
    })
  })
})
