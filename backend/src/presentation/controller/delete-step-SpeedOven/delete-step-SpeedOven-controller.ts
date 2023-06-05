/* eslint-disable eol-last */
import { DeleteStepSpeedOven } from '../../../domain/usecases/delete-step-SpeedOven'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-step-SpeedOven-controller-protocols'

export class DeleteStepSpeedOvenController implements Controller {
  private readonly stepSpeedOvenValidation: Validation
  private readonly deleteStepSpeedOven: DeleteStepSpeedOven

  constructor (stepSpeedOvenValidation: Validation, deleteStepSpeedOven: DeleteStepSpeedOven) {
    this.stepSpeedOvenValidation = stepSpeedOvenValidation
    this.deleteStepSpeedOven = deleteStepSpeedOven
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.stepSpeedOvenValidation.validate(httpRequest.params)
      if (error) return badRequest(new MissingParamError('id'))
      const { id } = httpRequest.params
      if (typeof (id) === 'undefined') {
        return badRequest(new InvalidParamError('id'))
      } else {
        await this.deleteStepSpeedOven.deleteStepSpeedOven(id)
        return ok({})
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
