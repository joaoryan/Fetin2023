import { UpdateStepSpeedOven } from '../../../domain/usecases/update-step-SpeedOven'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './update-step-SpeedOven-controller-protocols'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'

export class UpdateStepSpeedOvenController implements Controller {
  private readonly bodyValidation: Validation
  private readonly paramsValidation: Validation
  private readonly updateStepSpeedOven: UpdateStepSpeedOven

  constructor (bodyValidation: Validation, paramsValidation: Validation, updateStepSpeedOven: UpdateStepSpeedOven) {
    this.bodyValidation = bodyValidation
    this.paramsValidation = paramsValidation
    this.updateStepSpeedOven = updateStepSpeedOven
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.stepSpeedOven) return badRequest(new MissingParamError('stepSpeedOven'))
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationParamsError = this.paramsValidation.validate(httpRequest.params)
      const validationBodyError = this.bodyValidation.validate(httpRequest.body.stepSpeedOven)
      if (validationParamsError) return badRequest(validationParamsError)
      if (validationBodyError) return badRequest(validationBodyError)
      const result = await this.updateStepSpeedOven.updateStepSpeedOven(httpRequest.params.id, httpRequest.body.stepSpeedOven)
      if (!result) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
