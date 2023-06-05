import { AddStepCombiOvenCMAXModel } from '../../../../domain/usecases/add-step-CombiOvenCMAX'
import { StepCombiOvenCMAXModel } from '../../../../domain/models/stepCombiOvenCMAX'

export const mapCreatedStepCombiOvenCMAX = (addedStepCombiOvenCMAX: AddStepCombiOvenCMAXModel, addedStepCombiOvenCMAXId: number): StepCombiOvenCMAXModel => {
  return Object.assign({}, addedStepCombiOvenCMAX, { id: addedStepCombiOvenCMAXId })
}
