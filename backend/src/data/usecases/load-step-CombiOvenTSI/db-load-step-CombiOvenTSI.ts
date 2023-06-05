import { LoadStepCombiOvenTSI, StepCombiOvenTSIModel, LoadStepCombiOvenTSIRepository } from './db-load-step-CombiOvenTSI-protocols'

export class DbLoadStepCombiOvenTSI implements LoadStepCombiOvenTSI {
  private readonly loadStepCombiOvenTSIRepository: LoadStepCombiOvenTSIRepository

  constructor (loadStepCombiOvenTSIRepository: LoadStepCombiOvenTSIRepository) {
    this.loadStepCombiOvenTSIRepository = loadStepCombiOvenTSIRepository
  }

  async loadStepCombiOvenTSI (idRecipe: number): Promise<StepCombiOvenTSIModel[]> {
    const step: StepCombiOvenTSIModel[] = await this.loadStepCombiOvenTSIRepository.loadStepCombiOvenTSI(idRecipe)
    return step
  }
}
