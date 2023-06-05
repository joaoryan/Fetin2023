/* eslint-disable eol-last */
import { DeleteStepCombiOvenCMAX } from '../../../domain/usecases/delete-step-CombiOvenCMAX'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-step-CombiOvenCMAX-controller-protocols'

export class DeleteStepCombiOvenCMAXController implements Controller {
  private readonly stepCombiOvenCMAXValidation: Validation
  private readonly deleteStepCombiOvenCMAX: DeleteStepCombiOvenCMAX

  constructor (stepCombiOvenCMAXValidation: Validation, deleteStepCombiOvenCMAX: DeleteStepCombiOvenCMAX) {
    this.stepCombiOvenCMAXValidation = stepCombiOvenCMAXValidation
    this.deleteStepCombiOvenCMAX = deleteStepCombiOvenCMAX
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.stepCombiOvenCMAXValidation.validate(httpRequest.params)
      if (error) return badRequest(new MissingParamError('id'))
      const { id } = httpRequest.params
      if (typeof (id) === 'undefined') {
        return badRequest(new InvalidParamError('id'))
      } else {
        await this.deleteStepCombiOvenCMAX.deleteStepCombiOvenCMAX(id)
        return ok({})
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
