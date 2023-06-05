import { StepSpeedOvenModel } from '../../../../domain/models/stepSpeedOven'

export interface LoadStepSpeedOvenRepository {
    loadStepSpeedOven (idRecipe: number): Promise<StepSpeedOvenModel[]>
}
