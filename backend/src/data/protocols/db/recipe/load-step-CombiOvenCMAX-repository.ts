import { StepCombiOvenCMAXModel } from '../../../../domain/models/stepCombiOvenCMAX'

export interface LoadStepCombiOvenCMAXRepository {
    loadStepCombiOvenCMAX (idRecipe: number): Promise<StepCombiOvenCMAXModel[]>
}
