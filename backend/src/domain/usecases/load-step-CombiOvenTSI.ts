import { StepCombiOvenTSIModel } from '../models/stepCombiOvenTSI'

export interface LoadStepCombiOvenTSI {
    loadStepCombiOvenTSI(idRecipe: number): Promise<StepCombiOvenTSIModel[]>
}
