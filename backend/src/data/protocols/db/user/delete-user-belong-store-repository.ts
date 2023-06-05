export interface DeleteUserBelongStoreRepository {
    DeleteUserBelongStore(idUser: number, idStore: number): Promise<Boolean>
}
