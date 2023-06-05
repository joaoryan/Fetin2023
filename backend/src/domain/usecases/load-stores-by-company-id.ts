import { StoreModel } from '../models/store'

export interface LoadStoresByCompanyId {
  loadStoresByCompanyId(companyId: number, userId: number, userPrivilegeUser: string): Promise<StoreModel[] | null>
}
