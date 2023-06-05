import { StepCombiOvenTSIModel } from '../../../domain/models/stepCombiOvenTSI'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadStepCombiOvenTSI, Validation } from './load-step-CombiOvenTSI-controller-protocols'

export class LoadStepCombiOvenTSIController implements Controller {
  private readonly loadStepCombiOvenTSI: LoadStepCombiOvenTSI
  private readonly validation: Validation

  constructor (loadStepCombiOvenTSI: LoadStepCombiOvenTSI, validation: Validation) {
    this.loadStepCombiOvenTSI = loadStepCombiOvenTSI
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { recipeId, stepFrom } = httpRequest.params
      const response = await this.loadStepCombiOvenTSI.loadStepCombiOvenTSI(recipeId)
      if (!response) {
        return noContent()
      }
      const filterSteps = response.filter((step: StepCombiOvenTSIModel) => {
        return step.stepFrom === stepFrom
      })
      return ok({ stepsCombiOvenTSI: filterSteps })
    } catch (error) {
      return serverError(error)
    }
  }
}
