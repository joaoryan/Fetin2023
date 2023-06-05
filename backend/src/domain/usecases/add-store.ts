import { StoreModel } from '../models/store'

export interface AddStoreModel {
  companyId: number
  storeName: string
  cnpj: string
  street: string
  state: string
  neighborhood: string
  zipCode: number
  streetNumber: number
  city: string
  latitude: number
  longitude: number
}

export interface AddStore {
  addStore (store : AddStoreModel): Promise<StoreModel | null>
}
