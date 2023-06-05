import { DeleteStepSpeedOven, DeleteStepSpeedOvenRepository } from './db-delete-step-SpeedOven-protocols'

export class DbDeleteStepSpeedOven implements DeleteStepSpeedOven {
  private readonly deleteStepSpeedOvenRepository: DeleteStepSpeedOvenRepository

  constructor (deleteStepSpeedOvenRepository: DeleteStepSpeedOvenRepository) {
    this.deleteStepSpeedOvenRepository = deleteStepSpeedOvenRepository
  }

  async deleteStepSpeedOven (id: number): Promise<boolean> {
    return await this.deleteStepSpeedOvenRepository.deleteStepSpeedOven(id)
  }
}
