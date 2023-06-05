
import { AddUserBelongStore, UserBelongStoreModel } from '../../../domain/usecases/add-userBelongStore'
import { AddUserBelongStoreRepository } from '../../protocols/db/user/add-user-belong-store-repository'

export class DbAddUserBelongStore implements AddUserBelongStore {
  private readonly repository: AddUserBelongStoreRepository
  constructor (repository: AddUserBelongStoreRepository) {
    this.repository = repository
  }

  addUserBelongStore (userRelation: UserBelongStoreModel): Promise<UserBelongStoreModel> {
    return this.repository.addUserBelongStore(userRelation)
  }
}
