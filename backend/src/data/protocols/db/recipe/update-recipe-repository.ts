import { RecipeModel } from '../../../../domain/models/recipe'
import { UpdateRecipeModel } from '../../../../domain/usecases/update-recipe'

export interface UpdateRecipeRepository {
    updateRecipe(recipeData: UpdateRecipeModel): Promise<RecipeModel>
}
