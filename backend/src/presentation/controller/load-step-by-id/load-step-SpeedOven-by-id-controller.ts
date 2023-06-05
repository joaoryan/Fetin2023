import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadStepSpeedOvenById, Validation } from './load-step-SpeedOven-by-id-controller-protocols'

export class LoadStepSpeedOvenByIdController implements Controller {
  private readonly loadStepSpeedOvenById: LoadStepSpeedOvenById
  private readonly validation: Validation
  constructor (loadStepSpeedOvenById: LoadStepSpeedOvenById, validation: Validation) {
    this.loadStepSpeedOvenById = loadStepSpeedOvenById
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params
      const stepSpeedOven = await this.loadStepSpeedOvenById.loadStepSpeedOvenById(id)
      if (!stepSpeedOven) return noContent()
      return ok(stepSpeedOven)
    } catch (error) {
      return serverError(error)
    }
  }
}
