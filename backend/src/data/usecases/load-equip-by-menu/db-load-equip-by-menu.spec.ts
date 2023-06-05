/* eslint-disable no-undef */
import { mockEquipModel } from '../../../domain/mocks/equipment'
import { DbLoadEquipByMenu } from './db-load-equip-by-menu'
import { EquipModel, LoadEquipByMenuRepository } from './db-load-equip-by-menu-protocols'

const makeLoadEquipByMenuRepositorysitoryStub = (): LoadEquipByMenuRepository => {
  class LoadEquipByMenuRepositoryStub implements LoadEquipByMenuRepository {
    async loadByEquipMenu (menuId: number): Promise<EquipModel[]> {
      return new Promise(resolve => resolve([mockEquipModel()]))
    }
  }
  return new LoadEquipByMenuRepositoryStub()
}

interface SutTypes {
  sut: DbLoadEquipByMenu
  loadEquipByMenuRepositoryStub: LoadEquipByMenuRepository
}

const makeSut = (): SutTypes => {
  const loadEquipByMenuRepositoryStub = makeLoadEquipByMenuRepositorysitoryStub()
  const sut = new DbLoadEquipByMenu(loadEquipByMenuRepositoryStub)
  return {
    sut,
    loadEquipByMenuRepositoryStub
  }
}

describe('DbLoadEquipByPin usecase', () => {
  test('Should call loadByEquipMenu with correct values', async () => {
    const { sut, loadEquipByMenuRepositoryStub } = makeSut()
    const loadPin = jest.spyOn(loadEquipByMenuRepositoryStub, 'loadByEquipMenu')
    await sut.loadEquip(1)
    expect(loadPin).toHaveBeenCalledWith(1)
  })

  test('Should return null if loadEquipByMenuRepository returns null', async () => {
    const { sut, loadEquipByMenuRepositoryStub } = makeSut()
    jest.spyOn(loadEquipByMenuRepositoryStub, 'loadByEquipMenu').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const account = await sut.loadEquip(1000)
    expect(account).toBeNull()
  })

  test('Should seek an account about success', async () => {
    const { sut } = makeSut()
    const account = await sut.loadEquip(1)
    expect(account).toEqual([mockEquipModel()])
  })
})
