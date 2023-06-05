import { StepSpeedOvenModel } from '../../../../domain/models/stepSpeedOven'

export interface LoadStepsSpeedOvenByRecipeIdRepository {
    loadStepsSpeedOvenByRecipeId (idRecipe: number): Promise<StepSpeedOvenModel[]>
}
