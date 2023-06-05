export interface DeleteCookbook {
    deleteCookbook(id: number, equipType: number): Promise<boolean>
}
