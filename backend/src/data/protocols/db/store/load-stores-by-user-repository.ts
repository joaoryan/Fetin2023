import { StoreModel } from '../../../../domain/models/store'

export interface LoadStoresByUserRepository {
    loadStoresByUser(idUser: number): Promise<StoreModel[] | null>
}
