export interface DeleteRecipeRepository {
    deleteRecipe (id: number): Promise<void>
}
