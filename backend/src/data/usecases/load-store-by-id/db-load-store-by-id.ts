import { LoadStoreById } from '../../../domain/usecases/load-store-by-id'
import { LoadStoreByIdRepository } from '../../protocols/db/store/load-store-by-id-repository'
import { StoreModel } from '../add-store/db-add-store-protocols'

export class DbLoadStoreById implements LoadStoreById {
  private readonly loadStoreByIdRepository: LoadStoreByIdRepository

  constructor (loadStoreByIdRepository: LoadStoreByIdRepository) {
    this.loadStoreByIdRepository = loadStoreByIdRepository
  }

  async loadStoreById (id: number): Promise<StoreModel> {
    const store = await this.loadStoreByIdRepository.loadStoreById(id)
    if (store) {
      return store
    }
    return null
  }
}
