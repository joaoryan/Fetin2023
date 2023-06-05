import { StepSpeedOvenModel } from '../../../domain/models/stepSpeedOven'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadStepsSpeedOvenByRecipeId, Validation } from './load-step-SpeedOven-by-recipe-id-controller-protocols'

export class LoadStepsSpeedOvenByRecipeIdController implements Controller {
  private readonly loadStepsSpeedOvenByRecipeId: LoadStepsSpeedOvenByRecipeId
  private readonly validation: Validation

  constructor (loadStepsSpeedOvenByRecipeId: LoadStepsSpeedOvenByRecipeId, validation: Validation) {
    this.loadStepsSpeedOvenByRecipeId = loadStepsSpeedOvenByRecipeId
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { recipeId, stepFrom } = httpRequest.params
      console.log(stepFrom)
      const response = await this.loadStepsSpeedOvenByRecipeId.loadStepsSpeedOvenByRecipeId(recipeId)
      if (!response) {
        return noContent()
      }
      const filterSteps = response.filter((step: StepSpeedOvenModel) => {
        return step.stepFrom === stepFrom
      })
      return ok({ stepsSpeedOven: filterSteps })
    } catch (error) {
      return serverError(error)
    }
  }
}
