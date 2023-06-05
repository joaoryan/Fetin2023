import { StoreModel } from '../../../../domain/models/store'

export interface UpdateStoreRepository {
  updateStore (id:number, storeData: StoreModel): Promise<StoreModel>
}
