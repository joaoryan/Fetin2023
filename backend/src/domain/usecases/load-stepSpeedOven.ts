import { StepSpeedOvenModel } from '../models/stepSpeedOven'

export interface LoadStepSpeedOven {
    loadStepSpeedOven (idRecipe: number): Promise<StepSpeedOvenModel[]>
}
