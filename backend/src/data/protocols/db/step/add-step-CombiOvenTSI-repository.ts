import { AddStepCombiOvenTSIModel } from '../../../../domain/usecases/add-step-CombiOvenTSI'
import { StepCombiOvenTSIModel } from '../../../../domain/models/stepCombiOvenTSI'

export interface AddStepCombiOvenTSIRepository {
    addStepCombiOvenTSI (stepCombiOvenTSIData: AddStepCombiOvenTSIModel): Promise<StepCombiOvenTSIModel>
}
