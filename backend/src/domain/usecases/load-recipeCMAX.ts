import { RecipeCMAXModel } from '../models/recipeCMAX'

export interface LoadRecipeCMAX {
    loadRecipeCMAX (idMenu: number): Promise<RecipeCMAXModel[]>
}
