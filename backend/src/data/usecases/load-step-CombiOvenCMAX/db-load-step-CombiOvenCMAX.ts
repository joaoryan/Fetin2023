import { LoadStepCombiOvenCMAX, StepCombiOvenCMAXModel, LoadStepCombiOvenCMAXRepository } from './db-load-step-CombiOvenCMAX-protocols'

export class DbLoadStepCombiOvenCMAX implements LoadStepCombiOvenCMAX {
  private readonly loadStepCombiOvenCMAXRepository: LoadStepCombiOvenCMAXRepository

  constructor (loadStepCombiOvenCMAXRepository: LoadStepCombiOvenCMAXRepository) {
    this.loadStepCombiOvenCMAXRepository = loadStepCombiOvenCMAXRepository
  }

  async loadStepCombiOvenCMAX (idRecipe: number): Promise<StepCombiOvenCMAXModel[]> {
    const step: StepCombiOvenCMAXModel[] = await this.loadStepCombiOvenCMAXRepository.loadStepCombiOvenCMAX(idRecipe)
    return step
  }
}
