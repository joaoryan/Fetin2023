import { UserBelongStoreModel } from '../../../../domain/usecases/add-userBelongStore'

export interface AddUserBelongStoreRepository {
    addUserBelongStore(relationData: UserBelongStoreModel): Promise<UserBelongStoreModel>
}
