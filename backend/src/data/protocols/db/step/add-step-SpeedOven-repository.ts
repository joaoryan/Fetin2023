import { AddStepSpeedOvenModel } from '../../../../domain/usecases/add-step-SpeedOven'
import { StepSpeedOvenModel } from '../../../../domain/models/stepSpeedOven'

export interface AddStepSpeedOvenRepository {
    addStepSpeedOven (stepSpeedOvenData: AddStepSpeedOvenModel): Promise<StepSpeedOvenModel>
}
