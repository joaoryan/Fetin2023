/* eslint-disable eol-last */
import { DeleteStepCombiOvenTSI } from '../../../domain/usecases/delete-step-CombiOvenTSI'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-step-CombiOvenTSI-controller-protocols'

export class DeleteStepCombiOvenTSIController implements Controller {
  private readonly stepCombiOvenTSIValidation: Validation
  private readonly deleteStepCombiOvenTSI: DeleteStepCombiOvenTSI

  constructor (stepCombiOvenTSIValidation: Validation, deleteStepCombiOvenTSI: DeleteStepCombiOvenTSI) {
    this.stepCombiOvenTSIValidation = stepCombiOvenTSIValidation
    this.deleteStepCombiOvenTSI = deleteStepCombiOvenTSI
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.stepCombiOvenTSIValidation.validate(httpRequest.params)
      if (error) return badRequest(new MissingParamError('id'))
      const { id } = httpRequest.params
      if (typeof (id) === 'undefined') {
        return badRequest(new InvalidParamError('id'))
      } else {
        await this.deleteStepCombiOvenTSI.deleteStepCombiOvenTSI(id)
        return ok({})
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
