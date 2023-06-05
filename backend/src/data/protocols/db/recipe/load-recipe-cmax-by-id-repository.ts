import { RecipeCMAXModel } from '../../../../domain/models/recipeCMAX'

export interface LoadRecipeCMAXByIdRepository {
    loadRecipeCMAXById (id: number): Promise<RecipeCMAXModel>
}
