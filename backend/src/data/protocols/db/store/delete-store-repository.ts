export interface DeleteStoreRepository {
    deleteStore (id: number): Promise<void>
}
