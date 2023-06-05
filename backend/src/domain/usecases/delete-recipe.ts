export interface DeleteRecipe {
    deleteRecipe (id : number, equipTypeId: number): Promise<void>
}
