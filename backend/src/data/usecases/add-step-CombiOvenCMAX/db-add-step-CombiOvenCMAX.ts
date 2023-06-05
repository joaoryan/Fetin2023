import { StepCombiOvenCMAXModel } from '../../../domain/models/stepCombiOvenCMAX'
import { AddStepCombiOvenCMAX, AddStepCombiOvenCMAXModel } from '../../../domain/usecases/add-step-CombiOvenCMAX'
import { AddStepCombiOvenCMAXRepository } from './db-add-step-CombiOvenCMAX-protocols'

export class DbAddStepCombiOvenCMAX implements AddStepCombiOvenCMAX {
  private readonly addStepCombiOvenCMAXRepository: AddStepCombiOvenCMAXRepository

  constructor (addStepCombiOvenCMAXRepository: AddStepCombiOvenCMAXRepository) {
    this.addStepCombiOvenCMAXRepository = addStepCombiOvenCMAXRepository
  }

  async addStepCombiOvenCMAX (stepCombiOvenCMAX: AddStepCombiOvenCMAXModel): Promise<StepCombiOvenCMAXModel> {
    const stepCombiOvenCMAXResult = await this.addStepCombiOvenCMAXRepository.addStepCombiOvenCMAX(stepCombiOvenCMAX)
    return stepCombiOvenCMAXResult
  }
}
