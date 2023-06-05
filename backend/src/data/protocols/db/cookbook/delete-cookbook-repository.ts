export interface DeleteCookbookRepository {
    deleteCookbook(id: number): Promise<boolean>
}
