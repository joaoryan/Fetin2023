import { LoadStepsSpeedOvenByRecipeId } from '../../../domain/usecases/load-step-SpeedOven-by-recipe-id'
import { LoadStepsSpeedOvenByRecipeIdRepository } from '../../protocols/db/step/load-step-SpeedOven-by-recipe-id-repository'
import { StepSpeedOvenModel } from '../add-step-SpeedOven/db-add-step-SpeedOven-protocols'

export class DbLoadStepsSpeedOvenByRecipeId implements LoadStepsSpeedOvenByRecipeId {
  private readonly loadStepsSpeedOvenByRecipeIdRepository: LoadStepsSpeedOvenByRecipeIdRepository

  constructor (loadStepsSpeedOvenByRecipeIdRepository: LoadStepsSpeedOvenByRecipeIdRepository) {
    this.loadStepsSpeedOvenByRecipeIdRepository = loadStepsSpeedOvenByRecipeIdRepository
  }

  async loadStepsSpeedOvenByRecipeId (idRecipe: number): Promise<StepSpeedOvenModel[]> {
    const result: StepSpeedOvenModel[] = await this.loadStepsSpeedOvenByRecipeIdRepository.loadStepsSpeedOvenByRecipeId(idRecipe)
    return result
  }
}
