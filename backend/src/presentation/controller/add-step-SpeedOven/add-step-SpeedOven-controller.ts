import { StepSpeedOvenModel } from '../../../domain/models/stepSpeedOven'
import { AddStepSpeedOven } from '../../../domain/usecases/add-step-SpeedOven'
import { CreateStepSpeedOvenError } from '../../errors/create-step-SpeedOven-error'
import { StepSpeedOvenParamsError } from '../../errors/step-SpeedOven-params-error'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-step-SpeedOven-controller-protocols'

export class AddStepSpeedOvenController implements Controller {
  private readonly stepSpeedOvenValidation: Validation
  private readonly addStepSpeedOven: AddStepSpeedOven

  constructor (stepSpeedOvenValidation: Validation, addStepSpeedOven: AddStepSpeedOven) {
    this.stepSpeedOvenValidation = stepSpeedOvenValidation
    this.addStepSpeedOven = addStepSpeedOven
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.stepSpeedOven) return badRequest(new StepSpeedOvenParamsError())
      const stepSpeedOvenRequest = httpRequest.body.stepSpeedOven
      const error = this.stepSpeedOvenValidation.validate(stepSpeedOvenRequest)
      if (error) {
        return badRequest(error)
      }
      const stepSpeedOven = await this.addStepSpeedOven.addStepSpeedOven(stepSpeedOvenRequest)
      return created<StepSpeedOvenModel>(stepSpeedOven)
    } catch (error) {
      return serverError(new CreateStepSpeedOvenError())
    }
  }
}
