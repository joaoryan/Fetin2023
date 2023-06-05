import { RecipeCMAXModel } from '../../../../domain/models/recipeCMAX'
import { UpdateRecipeCmaxModel } from '../../../../domain/usecases/Update-recipeCMAX'

export interface UpdateRecipeCMAXRepository {
    updateRecipeCMAX(recipeData: UpdateRecipeCmaxModel): Promise<RecipeCMAXModel>
}
