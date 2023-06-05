import { StoreModel } from '../../../../domain/models/store'

export interface LoadStoresByCompanyIdRepository {
    loadStoresByCompanyId (idCompany: number): Promise<StoreModel[] | null>
}
