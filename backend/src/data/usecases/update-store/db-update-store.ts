import { UpdateStore, StoreModel, UpdateStoreRepository, LoadStoreByIdRepository } from './db-update-store-protocols'

export class DbUpdateStore implements UpdateStore {
  private readonly updateStoreRepository: UpdateStoreRepository
  private readonly loadStoreByIdRepository: LoadStoreByIdRepository

  constructor (updateStoreRepository: UpdateStoreRepository, loadStoreByIdRepository: LoadStoreByIdRepository) {
    this.updateStoreRepository = updateStoreRepository
    this.loadStoreByIdRepository = loadStoreByIdRepository
  }

  async updateStore (id: number, store: StoreModel): Promise<StoreModel> {
    await this.updateStoreRepository.updateStore(id, store)
    const recipeResult = await this.loadStoreByIdRepository.loadStoreById(id)
    return recipeResult
  }
}
