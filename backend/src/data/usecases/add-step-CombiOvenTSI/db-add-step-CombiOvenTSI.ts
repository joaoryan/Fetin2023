import { StepCombiOvenTSIModel } from '../../../domain/models/stepCombiOvenTSI'
import { AddStepCombiOvenTSI, AddStepCombiOvenTSIModel } from '../../../domain/usecases/add-step-CombiOvenTSI'
import { AddStepCombiOvenTSIRepository } from './db-add-step-CombiOvenTSI-protocols'

export class DbAddStepCombiOvenTSI implements AddStepCombiOvenTSI {
  private readonly addStepCombiOvenTSIRepository: AddStepCombiOvenTSIRepository

  constructor (addStepCombiOvenTSIRepository: AddStepCombiOvenTSIRepository) {
    this.addStepCombiOvenTSIRepository = addStepCombiOvenTSIRepository
  }

  async addStepCombiOvenTSI (stepCombiOvenTSI: AddStepCombiOvenTSIModel): Promise<StepCombiOvenTSIModel> {
    const stepCombiOvenTSIResult = await this.addStepCombiOvenTSIRepository.addStepCombiOvenTSI(stepCombiOvenTSI)
    return stepCombiOvenTSIResult
  }
}
