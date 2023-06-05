import { UpdateStepSpeedOven, StepSpeedOvenModel, UpdateStepSpeedOvenRepository } from './db-update-step-SpeedOven-protocols'

export class DbUpdateStepSpeedOven implements UpdateStepSpeedOven {
  private readonly updateStepSpeedOvenRepository: UpdateStepSpeedOvenRepository

  constructor (updateStepSpeedOvenRepository: UpdateStepSpeedOvenRepository) {
    this.updateStepSpeedOvenRepository = updateStepSpeedOvenRepository
  }

  async updateStepSpeedOven (id: number, stepSpeedOven: StepSpeedOvenModel): Promise<boolean> {
    return await this.updateStepSpeedOvenRepository.updateStepSpeedOven(id, stepSpeedOven)
  }
}
