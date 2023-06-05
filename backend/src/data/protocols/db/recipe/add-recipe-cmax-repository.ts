import { AddRecipeCMAXModel } from '../../../../domain/usecases/add-recipeCMAX'
import { RecipeCMAXModel } from '../../../../domain/models/recipeCMAX'

export interface AddRecipeCMAXRepository {
    addRecipeCMAX (recipeData: AddRecipeCMAXModel): Promise<RecipeCMAXModel>
}
