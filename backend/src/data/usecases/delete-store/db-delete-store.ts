import { StoreModel, DeleteStore, DeleteStoreRepository, LoadStoreByIdRepository } from './db-delete-store-protocols'

export class DbDeleteStore implements DeleteStore {
  private readonly deleteStoreRepository: DeleteStoreRepository
  private readonly loadStoreRepository: LoadStoreByIdRepository

  constructor (deleteStoreRepository: DeleteStoreRepository, loadStoreRepository: LoadStoreByIdRepository) {
    this.deleteStoreRepository = deleteStoreRepository
    this.loadStoreRepository = loadStoreRepository
  }

  async deleteStore (id: number): Promise<boolean> {
    await this.deleteStoreRepository.deleteStore(id)
    const store: StoreModel = await this.loadStoreRepository.loadStoreById(id)
    if (store) {
      return false
    }
    return true
  }
}
