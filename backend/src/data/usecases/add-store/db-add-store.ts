import { StoreModel } from '../../../domain/models/Store'
import { AddStore, AddStoreModel } from '../../../domain/usecases/add-Store'
import { AddStoreRepository } from './db-add-Store-protocols'

export class DbAddStore implements AddStore {
  private readonly addStoreRepository: AddStoreRepository

  constructor (addStoreRepository: AddStoreRepository) {
    this.addStoreRepository = addStoreRepository
  }

  async addStore (store: AddStoreModel): Promise<StoreModel> {
    const storeResult = await this.addStoreRepository.addStore(store)
    return storeResult
  }
}
