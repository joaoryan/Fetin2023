import { StepCombiOvenCMAXModel } from '../../../domain/models/stepCombiOvenCMAX'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadStepCombiOvenCMAX, Validation } from './load-step-CombiOvenCMAX-controller-protocols'

export class LoadStepCombiOvenCMAXController implements Controller {
  private readonly loadStepCombiOvenCMAX: LoadStepCombiOvenCMAX
  private readonly validation: Validation

  constructor (loadStepCombiOvenCMAX: LoadStepCombiOvenCMAX, validation: Validation) {
    this.loadStepCombiOvenCMAX = loadStepCombiOvenCMAX
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { recipeId, stepFrom } = httpRequest.params
      const response = await this.loadStepCombiOvenCMAX.loadStepCombiOvenCMAX(recipeId)
      if (!response) {
        return noContent()
      }

      const filterSteps = response.filter((step: StepCombiOvenCMAXModel) => {
        return step.stepFrom === stepFrom
      })
      console.table(filterSteps)
      return ok({ stepsCombiOvenCMAX: response })
    } catch (error) {
      return serverError(error)
    }
  }
}
