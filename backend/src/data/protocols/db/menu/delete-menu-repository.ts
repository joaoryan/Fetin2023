export interface DeleteMenuRepository {
    deleteMenu(id: number): Promise<boolean>
}
