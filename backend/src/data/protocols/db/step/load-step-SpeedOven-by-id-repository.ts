import { StepSpeedOvenModel } from '../../../usecases/add-step-SpeedOven/db-add-step-SpeedOven-protocols'

export interface LoadStepSpeedOvenByIdRepository {
    loadStepSpeedOvenById (id: number): Promise<StepSpeedOvenModel>
}
