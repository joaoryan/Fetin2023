import { UpdateStepCombiOvenTSI } from '../../../domain/usecases/update-step-CombiOvenTSI'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './update-step-CombiOvenTSI-controller-protocols'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'

export class UpdateStepCombiOvenTSIController implements Controller {
  private readonly bodyValidation: Validation
  private readonly paramsValidation: Validation
  private readonly updateStepCombiOvenTSI: UpdateStepCombiOvenTSI

  constructor (bodyValidation: Validation, paramsValidation: Validation, updateStepCombiOvenTSI: UpdateStepCombiOvenTSI) {
    this.bodyValidation = bodyValidation
    this.paramsValidation = paramsValidation
    this.updateStepCombiOvenTSI = updateStepCombiOvenTSI
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.stepCombiOvenTSI) return badRequest(new MissingParamError('stepCombiOvenTSI'))
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationParamsError = this.paramsValidation.validate(httpRequest.params)
      const validationBodyError = this.bodyValidation.validate(httpRequest.body.stepCombiOvenTSI)
      if (validationParamsError) return badRequest(validationParamsError)
      if (validationBodyError) return badRequest(validationBodyError)
      const result = await this.updateStepCombiOvenTSI.updateStepCombiOvenTSI(httpRequest.params.id, httpRequest.body.stepCombiOvenTSI)
      if (!result) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
