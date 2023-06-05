import { UpdateStepCombiOvenCMAX } from '../../../domain/usecases/update-step-CombiOvenCMAX'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './update-step-CombiOvenCMAX-controller-protocols'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'

export class UpdateStepCombiOvenCMAXController implements Controller {
  private readonly bodyValidation: Validation
  private readonly paramsValidation: Validation
  private readonly updateStepCombiOvenCMAX: UpdateStepCombiOvenCMAX

  constructor (bodyValidation: Validation, paramsValidation: Validation, updateStepCombiOvenCMAX: UpdateStepCombiOvenCMAX) {
    this.bodyValidation = bodyValidation
    this.paramsValidation = paramsValidation
    this.updateStepCombiOvenCMAX = updateStepCombiOvenCMAX
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.stepCombiOvenCMAX) return badRequest(new MissingParamError('stepCombiOvenCMAX'))
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationParamsError = this.paramsValidation.validate(httpRequest.params)
      const validationBodyError = this.bodyValidation.validate(httpRequest.body.stepCombiOvenCMAX)
      if (validationParamsError) return badRequest(validationParamsError)
      if (validationBodyError) return badRequest(validationBodyError)
      const result = await this.updateStepCombiOvenCMAX.updateStepCombiOvenCMAX(httpRequest.params.id, httpRequest.body.stepCombiOvenCMAX)
      if (!result) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
