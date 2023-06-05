import { LoadStepSpeedOven, StepSpeedOvenModel, LoadStepSpeedOvenRepository } from './db-load-stepSpeedOven-protocols'

export class DbLoadStepSpeedOven implements LoadStepSpeedOven {
  private readonly loadStepSpeedOvenRepository: LoadStepSpeedOvenRepository

  constructor (loadStepSpeedOvenRepository: LoadStepSpeedOvenRepository) {
    this.loadStepSpeedOvenRepository = loadStepSpeedOvenRepository
  }

  async loadStepSpeedOven (idRecipe: number): Promise<StepSpeedOvenModel[]> {
    const step: StepSpeedOvenModel[] = await this.loadStepSpeedOvenRepository.loadStepSpeedOven(idRecipe)
    return step
  }
}
