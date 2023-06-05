import { AddStepCombiOvenTSIModel } from '../../../../domain/usecases/add-step-CombiOvenTSI'
import { StepCombiOvenTSIModel } from '../../../../domain/models/stepCombiOvenTSI'

export const mapCreatedStepCombiOvenTSI = (addedStepCombiOvenTSI: AddStepCombiOvenTSIModel, addedStepCombiOvenTSIId: number): StepCombiOvenTSIModel => {
  return Object.assign({}, addedStepCombiOvenTSI, { id: addedStepCombiOvenTSIId })
}
