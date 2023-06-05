export interface DeleteGroupRepository {
    deleteGroup(id: number): Promise<boolean>
}
