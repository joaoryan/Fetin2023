import { StepCombiOvenTSIModel } from '../../../../domain/models/stepCombiOvenTSI'

export interface UpdateStepCombiOvenTSIRepository {
  updateStepCombiOvenTSI (id:number, stepCombiOvenTSIData: StepCombiOvenTSIModel): Promise<boolean>
}
