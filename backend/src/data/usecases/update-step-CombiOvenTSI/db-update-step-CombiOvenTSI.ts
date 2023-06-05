import { UpdateStepCombiOvenTSI, StepCombiOvenTSIModel, UpdateStepCombiOvenTSIRepository } from './db-update-step-CombiOvenTSI-protocols'

export class DbUpdateStepCombiOvenTSI implements UpdateStepCombiOvenTSI {
  private readonly updateStepCombiOvenTSIRepository: UpdateStepCombiOvenTSIRepository

  constructor (updateStepCombiOvenTSIRepository: UpdateStepCombiOvenTSIRepository) {
    this.updateStepCombiOvenTSIRepository = updateStepCombiOvenTSIRepository
  }

  async updateStepCombiOvenTSI (id: number, stepCombiOvenTSI: StepCombiOvenTSIModel): Promise<boolean> {
    return await this.updateStepCombiOvenTSIRepository.updateStepCombiOvenTSI(id, stepCombiOvenTSI)
  }
}
