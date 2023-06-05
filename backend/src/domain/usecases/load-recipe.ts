import { RecipeModel } from '../models/recipe'

export interface LoadRecipe {
    loadRecipe (idGroup: number): Promise<RecipeModel[]>
}
