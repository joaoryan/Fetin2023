import { AddRecipeModel } from '../../../../domain/usecases/add-recipe'
import { RecipeModel } from '../../../../domain/models/recipe'

export interface AddRecipeRepository {
    addRecipe (recipeData: AddRecipeModel): Promise<RecipeModel>
}
