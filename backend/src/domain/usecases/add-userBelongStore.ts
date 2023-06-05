export interface UserBelongStoreModel {
  idUser: number,
  idStore: number
}

export interface AddUserBelongStore {
  addUserBelongStore(userRelation: UserBelongStoreModel): Promise<UserBelongStoreModel>
}
