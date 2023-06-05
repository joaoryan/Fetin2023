/* eslint-disable no-undef */
import { DbLoadEquipByPin } from './db-load-equip-by-pin'
import { LoadEquipByPinRepository } from '../../protocols/db/equipment/load-equip-by-pin-repository'
import { EquipModel } from '../../../domain/models/equipment'
import { mockEquipModel } from '../../../domain/mocks/equipment'

const makeLoadequipByPinRepositoryStub = (): LoadEquipByPinRepository => {
  class LoadEquipByPinRepositoryStub implements LoadEquipByPinRepository {
    async loadByEquipPin (IOKPin: String): Promise<EquipModel> {
      return new Promise(resolve => resolve(mockEquipModel()))
    }
  }
  return new LoadEquipByPinRepositoryStub()
}

interface SutTypes {
  sut: DbLoadEquipByPin
  loadequipByPinRepositoryStub: LoadEquipByPinRepository
}

const makeSut = (): SutTypes => {
  const loadequipByPinRepositoryStub = makeLoadequipByPinRepositoryStub()
  const sut = new DbLoadEquipByPin(loadequipByPinRepositoryStub)
  return {
    sut,
    loadequipByPinRepositoryStub
  }
}

describe('DbLoadEquipByPin usecase', () => {
  test('Should call loadByEquipPin with correct values', async () => {
    const { sut, loadequipByPinRepositoryStub } = makeSut()
    const loadPin = jest.spyOn(loadequipByPinRepositoryStub, 'loadByEquipPin')
    await sut.load('iokPin')
    expect(loadPin).toHaveBeenCalledWith('iokPin')
  })

  test('Should return null if loadequipByPinRepository returns null', async () => {
    const { sut, loadequipByPinRepositoryStub } = makeSut()
    jest.spyOn(loadequipByPinRepositoryStub, 'loadByEquipPin').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('iokPin')
    expect(account).toBeNull()
  })

  test('Should seek an account about success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('iokPin')
    expect(account).toEqual(mockEquipModel())
  })
})
