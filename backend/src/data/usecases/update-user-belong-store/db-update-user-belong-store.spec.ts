/* eslint-disable no-undef */
import { DbUpdateUserBelongStore } from './db-update-user-belong-store'
import { LoadStoresByUserRepository } from '../../protocols/db/store/load-stores-by-user-repository'
import { AddUserBelongStoreRepository } from '../../protocols/db/user/add-user-belong-store-repository'
import { DeleteUserBelongStoreRepository } from '../../protocols/db/user/delete-user-belong-store-repository'
import { StoreModel } from '../../../domain/models/store'
import { mockLoadStoreByIdResponse } from '../../../domain/mocks/store'
import { UserBelongStoreModel } from '../../../domain/usecases/add-userBelongStore'

class LoadStoresByUserRepositoryStub implements LoadStoresByUserRepository {
  async loadStoresByUser (idUser: number): Promise<StoreModel[] | null> {
    return new Promise<StoreModel[]>(resolve => resolve([mockLoadStoreByIdResponse()]))
  }
}

class AddUserBelongStoreRepositoryStub implements AddUserBelongStoreRepository {
  async addUserBelongStore (relationData: UserBelongStoreModel): Promise<UserBelongStoreModel> {
    return new Promise(resolve => resolve({ idUser: 1, idStore: 1 }))
  }
}

class DeleteUserBelongStoreRepositoryStub implements DeleteUserBelongStoreRepository {
  async DeleteUserBelongStore (idStore: number): Promise<Boolean> {
    return new Promise(resolve => resolve(true))
  }
}

interface SutTypes {
  sut: DbUpdateUserBelongStore
  loadStoresByUserRepositoryStub: LoadStoresByUserRepository
  addUserBelongStoreRepositoryStub: AddUserBelongStoreRepository
  deleteUserBelongStoreRepositoryStub: DeleteUserBelongStoreRepository
}

const makeSut = (): SutTypes => {
  const loadStoresByUserRepositoryStub = new LoadStoresByUserRepositoryStub()
  const addUserBelongStoreRepositoryStub = new AddUserBelongStoreRepositoryStub()
  const deleteUserBelongStoreRepositoryStub = new DeleteUserBelongStoreRepositoryStub()
  const sut = new DbUpdateUserBelongStore(loadStoresByUserRepositoryStub, addUserBelongStoreRepositoryStub, deleteUserBelongStoreRepositoryStub)
  return {
    sut,
    loadStoresByUserRepositoryStub,
    addUserBelongStoreRepositoryStub,
    deleteUserBelongStoreRepositoryStub
  }
}

describe('DbUpdateUserBelongStore Usecase', () => {
  test('Should call LoadStoresByUserRepository with correct values', async () => {
    const { sut, loadStoresByUserRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadStoresByUserRepositoryStub, 'loadStoresByUser')
    await sut.editUserBelongStoreData(1, [1])
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should call AddUserBelongStoreRepository with correct values', async () => {
    const { sut, addUserBelongStoreRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUserBelongStoreRepositoryStub, 'addUserBelongStore')
    await sut.editUserBelongStoreData(1, [2])
    expect(addSpy).toHaveBeenCalledWith({ idUser: 1, idStore: 2 })
  })

  test('Should call DeleteUserBelongStoreRepository with correct values', async () => {
    const { sut, deleteUserBelongStoreRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteUserBelongStoreRepositoryStub, 'DeleteUserBelongStore')
    await sut.editUserBelongStoreData(1, [2])
    expect(deleteSpy).toHaveBeenCalledWith(1, 1)
  })
})
