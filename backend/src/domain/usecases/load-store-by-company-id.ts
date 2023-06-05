import { StoreModel } from '../models/store'

export interface LoadStoresByCompanyId {
  loadStoresByCompanyId (id: number): Promise<StoreModel[] | null>
}
