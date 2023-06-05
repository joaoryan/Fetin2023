import { AddStepCombiOvenCMAXModel } from '../../../../domain/usecases/add-step-CombiOvenCMAX'
import { StepCombiOvenCMAXModel } from '../../../../domain/models/stepCombiOvenCMAX'

export interface AddStepCombiOvenCMAXRepository {
    addStepCombiOvenCMAX (stepCombiOvenCMAXData: AddStepCombiOvenCMAXModel): Promise<StepCombiOvenCMAXModel>
}
