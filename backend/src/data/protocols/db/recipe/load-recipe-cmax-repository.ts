import { RecipeCMAXModel } from '../../../../domain/models/recipeCMAX'

export interface LoadRecipeCMAXRepository {
    loadRecipeCMAX (idMenu: number): Promise<RecipeCMAXModel[]>
}
