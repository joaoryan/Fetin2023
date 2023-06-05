import { EditUserBelongStoreData } from '../../../domain/usecases/update-user-belong-store-data'
import { LoadStoresByUserRepository } from '../../protocols/db/store/load-stores-by-user-repository'
import { AddUserBelongStoreRepository } from '../../protocols/db/user/add-user-belong-store-repository'
import { DeleteUserBelongStoreRepository } from '../../protocols/db/user/delete-user-belong-store-repository'

export class DbUpdateUserBelongStore implements EditUserBelongStoreData {
  private readonly loadStoresByUserRepository: LoadStoresByUserRepository
  private readonly addUserBelongStoreRepository: AddUserBelongStoreRepository
  private readonly deleteUserBelongStoreRepository: DeleteUserBelongStoreRepository

  constructor (loadStoresByUserRepository: LoadStoresByUserRepository, addUserBelongStoreRepository: AddUserBelongStoreRepository, deleteUserBelongStoreRepository: DeleteUserBelongStoreRepository) {
    this.loadStoresByUserRepository = loadStoresByUserRepository
    this.addUserBelongStoreRepository = addUserBelongStoreRepository
    this.deleteUserBelongStoreRepository = deleteUserBelongStoreRepository
  }

  async editUserBelongStoreData (idUser: number, idStore: number[]): Promise<void> {
    const store = await this.loadStoresByUserRepository.loadStoresByUser(idUser)
    for (const id of idStore) {
      if (!store.find(x => x.id === id)) {
        await this.addUserBelongStoreRepository.addUserBelongStore({ idUser: idUser, idStore: id })
      }
    }
    for (const storeItem of store) {
      if (!idStore.find(x => x === storeItem.id)) {
        await this.deleteUserBelongStoreRepository.DeleteUserBelongStore(idUser, storeItem.id)
      }
    }
  }
}
