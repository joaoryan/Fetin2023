import { AddStepSpeedOvenModel } from '../../../../domain/usecases/add-step-SpeedOven'
import { StepSpeedOvenModel } from '../../../../domain/models/stepSpeedOven'

export const mapCreatedStepSpeedOven = (addedStepSpeedOven: AddStepSpeedOvenModel, addedStepSpeedOvenId: number): StepSpeedOvenModel => {
  return Object.assign({}, addedStepSpeedOven, { id: addedStepSpeedOvenId })
}
