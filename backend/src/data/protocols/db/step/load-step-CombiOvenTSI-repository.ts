import { StepCombiOvenTSIModel } from '../../../../domain/models/stepCombiOvenTSI'

export interface LoadStepCombiOvenTSIRepository {
    loadStepCombiOvenTSI(idRecipe: number): Promise<StepCombiOvenTSIModel[]>
}
