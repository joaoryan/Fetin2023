import { describe, test, expect } from '@jest/globals'
import { FilesRepository } from './files-repository'
import path from 'path'

describe('Files Repository', () => {
  const sut = new FilesRepository()
  describe('DownloadUpdateRepository method tests', () => {
    test('should return the COPA update file', async () => {
      const filePathResponse = path.resolve(__dirname, '../../../../public/update/', 'PraticaUi.tar')
      const filePath = await sut.downloadUpdate('COPA')
      expect(filePath).toEqual(filePathResponse)
    })
    test('should return the FIT update file', async () => {
      const filePathResponse = path.resolve(__dirname, '../../../../public/update/', 'FIT.tar')
      const filePath = await sut.downloadUpdate('FIT')
      expect(filePath).toEqual(filePathResponse)
    })
    test('should return the FORZA update file', async () => {
      const filePathResponse = path.resolve(__dirname, '../../../../public/update/', 'FORZA.tar')
      const filePath = await sut.downloadUpdate('FORZA')
      expect(filePath).toEqual(filePathResponse)
    })
    test('should return the TSI update file', async () => {
      const filePathResponse = path.resolve(__dirname, '../../../../public/update', 'Package.tar')
      const filePath = await sut.downloadUpdate('TSI')
      expect(filePath).toEqual(filePathResponse)
    })
  })
})
