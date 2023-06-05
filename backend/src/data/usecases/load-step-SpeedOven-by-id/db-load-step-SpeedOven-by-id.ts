import { LoadStepSpeedOvenById } from '../../../domain/usecases/load-step-SpeedOven-by-id'
import { LoadStepSpeedOvenByIdRepository } from '../../protocols/db/step/load-step-SpeedOven-by-id-repository'
import { StepSpeedOvenModel } from '../add-step-SpeedOven/db-add-step-SpeedOven-protocols'

export class DbLoadStepSpeedOvenById implements LoadStepSpeedOvenById {
  private readonly loadStepSpeedOvenByIdRepository: LoadStepSpeedOvenByIdRepository

  constructor (loadStepSpeedOvenByIdRepository: LoadStepSpeedOvenByIdRepository) {
    this.loadStepSpeedOvenByIdRepository = loadStepSpeedOvenByIdRepository
  }

  async loadStepSpeedOvenById (id: number): Promise<StepSpeedOvenModel> {
    const stepSpeedOven = await this.loadStepSpeedOvenByIdRepository.loadStepSpeedOvenById(id)
    if (stepSpeedOven) {
      return stepSpeedOven
    }
    return null
  }
}
