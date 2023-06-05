import { DeleteStepCombiOvenCMAX, DeleteStepCombiOvenCMAXRepository } from './db-delete-step-CombiOvenCMAX-protocols'

export class DbDeleteStepCombiOvenCMAX implements DeleteStepCombiOvenCMAX {
  private readonly deleteStepCombiOvenCMAXRepository: DeleteStepCombiOvenCMAXRepository

  constructor (deleteStepCombiOvenCMAXRepository: DeleteStepCombiOvenCMAXRepository) {
    this.deleteStepCombiOvenCMAXRepository = deleteStepCombiOvenCMAXRepository
  }

  async deleteStepCombiOvenCMAX (id: number): Promise<boolean> {
    return await this.deleteStepCombiOvenCMAXRepository.deleteStepCombiOvenCMAX(id)
  }
}
