import { DeleteStepCombiOvenTSI, DeleteStepCombiOvenTSIRepository } from './db-delete-step-CombiOvenTSI-protocols'

export class DbDeleteStepCombiOvenTSI implements DeleteStepCombiOvenTSI {
  private readonly deleteStepCombiOvenTSIRepository: DeleteStepCombiOvenTSIRepository

  constructor (deleteStepCombiOvenTSIRepository: DeleteStepCombiOvenTSIRepository) {
    this.deleteStepCombiOvenTSIRepository = deleteStepCombiOvenTSIRepository
  }

  async deleteStepCombiOvenTSI (id: number): Promise<boolean> {
    return await this.deleteStepCombiOvenTSIRepository.deleteStepCombiOvenTSI(id)
  }
}
