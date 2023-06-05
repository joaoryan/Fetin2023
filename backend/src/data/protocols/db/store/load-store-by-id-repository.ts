import { StoreModel } from '../../../../domain/models/store'

export interface LoadStoreByIdRepository {
    loadStoreById (id: number): Promise<StoreModel | null>
}
