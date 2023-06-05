import { StoreModel } from '../models/store'

export interface LoadStoreById {
  loadStoreById (id: number): Promise<StoreModel| null>
}
