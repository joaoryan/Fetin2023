import { AddStoreModel } from '../../../../domain/usecases/add-store'
import { StoreModel } from '../../../../domain/models/store'

export interface AddStoreRepository {
    addStore (storeData: AddStoreModel): Promise<StoreModel>
}
