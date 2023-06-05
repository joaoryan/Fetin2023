import { StepSpeedOvenModel } from '../models/stepSpeedOven'

export interface LoadStepSpeedOvenById {
  loadStepSpeedOvenById (id: number): Promise<StepSpeedOvenModel | null>
}
