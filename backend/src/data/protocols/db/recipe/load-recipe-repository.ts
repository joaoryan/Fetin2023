import { RecipeModel } from '../../../../domain/models/recipe'

export interface LoadRecipeRepository {
    loadRecipe (idGroup: number): Promise<RecipeModel[]>
}
