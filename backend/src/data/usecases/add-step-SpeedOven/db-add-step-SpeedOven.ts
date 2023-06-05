import { StepSpeedOvenModel } from '../../../domain/models/stepSpeedOven'
import { AddStepSpeedOven, AddStepSpeedOvenModel } from '../../../domain/usecases/add-step-SpeedOven'
import { AddStepSpeedOvenRepository } from './db-add-step-SpeedOven-protocols'

export class DbAddStepSpeedOven implements AddStepSpeedOven {
  private readonly addStepSpeedOvenRepository: AddStepSpeedOvenRepository

  constructor (addStepSpeedOvenRepository: AddStepSpeedOvenRepository) {
    this.addStepSpeedOvenRepository = addStepSpeedOvenRepository
  }

  async addStepSpeedOven (stepSpeedOven: AddStepSpeedOvenModel): Promise<StepSpeedOvenModel> {
    const stepSpeedOvenResult = await this.addStepSpeedOvenRepository.addStepSpeedOven(stepSpeedOven)
    return stepSpeedOvenResult
  }
}
