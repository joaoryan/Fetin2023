import { StoreModel } from '../models/store'

export interface UpdateStoreModel extends StoreModel {}
export interface UpdateStore {
  updateStore (id: number, store : UpdateStoreModel): Promise<StoreModel>
}
