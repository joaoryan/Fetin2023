import { RecipeModel } from '../../../../domain/models/recipe'

export interface LoadRecipeByIdRepository {
    loadRecipeById (id: number): Promise<RecipeModel>
}
