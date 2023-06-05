import { UpdateStepCombiOvenCMAX, StepCombiOvenCMAXModel, UpdateStepCombiOvenCMAXRepository } from './db-update-step-CombiOvenCMAX-protocols'

export class DbUpdateStepCombiOvenCMAX implements UpdateStepCombiOvenCMAX {
  private readonly updateStepCombiOvenCMAXRepository: UpdateStepCombiOvenCMAXRepository

  constructor (updateStepCombiOvenCMAXRepository: UpdateStepCombiOvenCMAXRepository) {
    this.updateStepCombiOvenCMAXRepository = updateStepCombiOvenCMAXRepository
  }

  async updateStepCombiOvenCMAX (id: number, stepCombiOvenCMAX: StepCombiOvenCMAXModel): Promise<boolean> {
    return await this.updateStepCombiOvenCMAXRepository.updateStepCombiOvenCMAX(id, stepCombiOvenCMAX)
  }
}
