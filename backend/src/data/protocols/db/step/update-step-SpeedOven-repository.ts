import { StepSpeedOvenModel } from '../../../../domain/models/stepSpeedOven'

export interface UpdateStepSpeedOvenRepository {
  updateStepSpeedOven (id:number, stepSpeedOvenData: StepSpeedOvenModel): Promise<boolean>
}
