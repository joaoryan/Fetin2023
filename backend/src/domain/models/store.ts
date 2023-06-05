export interface StoreModel {
  id: number
  storeName: string
  cnpj: string
  companyId: number
  street: string
  state: string
  neighborhood: string
  zipCode: number
  streetNumber: number
  city: string
  latitude: number
  longitude: number
  equipmentCount?: number
}
