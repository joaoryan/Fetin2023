import { AddStoreModel } from '../../../../domain/usecases/add-store'
import { StoreModel } from '../../../../domain/models/store'

export const mapCreatedStore = (addedStore: AddStoreModel, addedStoreId: number): StoreModel => {
  return Object.assign({}, addedStore, { id: addedStoreId })
}
