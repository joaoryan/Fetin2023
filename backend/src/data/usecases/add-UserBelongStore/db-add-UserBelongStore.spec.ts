import { describe, test, expect, jest } from '@jest/globals'
import { DbAddUserBelongStore } from './db-add-UserBelongStore'
import { AddUserBelongStoreRepository } from '../../protocols/db/user/add-user-belong-store-repository'
import { UserBelongStoreModel } from '../../../domain/usecases/add-userBelongStore'

class AddUserBelongStoreRepositoryStub implements AddUserBelongStoreRepository {
  async addUserBelongStore (relationData: UserBelongStoreModel): Promise<UserBelongStoreModel> {
    return { idUser: 1, idStore: 1 }
  }
}

type SutTypes = {
  sut: DbAddUserBelongStore
  addUserBelongStoreRepositoryStub: AddUserBelongStoreRepositoryStub
}

const makeSut = (): SutTypes => {
  const addUserBelongStoreRepositoryStub = new AddUserBelongStoreRepositoryStub()
  const sut = new DbAddUserBelongStore(addUserBelongStoreRepositoryStub)
  return {
    sut,
    addUserBelongStoreRepositoryStub
  }
}

describe('Testing the DbAddUserBelongStore class', () => {
  describe('Dependency with addUserBelongStoreRepository class', () => {
    test('should call the addUserBelongStore method only once', async () => {
      const { sut, addUserBelongStoreRepositoryStub } = makeSut()
      const addSpy = jest.spyOn(addUserBelongStoreRepositoryStub, 'addUserBelongStore')
      await sut.addUserBelongStore({ idUser: 1, idStore: 1 })
      expect(addSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the addUserBelongStore method with the correct parameter', async () => {
      const { sut, addUserBelongStoreRepositoryStub } = makeSut()
      const addEquipmentRepositorySpy = jest.spyOn(addUserBelongStoreRepositoryStub, 'addUserBelongStore')
      await sut.addUserBelongStore({ idUser: 1, idStore: 1 })
      expect(addEquipmentRepositorySpy).toHaveBeenCalledWith({ idUser: 1, idStore: 1 })
    })
    test('should return a new addUserBelongStore in case of success', async () => {
      const { sut } = makeSut()
      const userBelongStore = await sut.addUserBelongStore({ idUser: 1, idStore: 1 })
      expect(userBelongStore).toEqual({ idUser: 1, idStore: 1 })
    })
    test('should throw an exception if the addUserBelongStore method fails', async () => {
      const { sut, addUserBelongStoreRepositoryStub } = makeSut()
      jest.spyOn(addUserBelongStoreRepositoryStub, 'addUserBelongStore').mockRejectedValue(new Error())
      await expect(sut.addUserBelongStore({ idUser: 1, idStore: 1 })).rejects.toThrow()
    })
  })
})
