import { StepCombiOvenCMAXModel } from '../models/stepCombiOvenCMAX'

export interface LoadStepCombiOvenCMAX {
    loadStepCombiOvenCMAX (idRecipe: number): Promise<StepCombiOvenCMAXModel[]>
}
