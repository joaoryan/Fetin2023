import { StepCombiOvenCMAXModel } from '../../../../domain/models/stepCombiOvenCMAX'

export interface UpdateStepCombiOvenCMAXRepository {
  updateStepCombiOvenCMAX (id:number, stepCombiOvenCMAXData: StepCombiOvenCMAXModel): Promise<boolean>
}
