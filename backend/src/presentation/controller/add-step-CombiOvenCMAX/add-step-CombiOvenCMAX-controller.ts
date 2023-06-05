import { StepCombiOvenCMAXModel } from '../../../domain/models/stepCombiOvenCMAX'
import { AddStepCombiOvenCMAX } from '../../../domain/usecases/add-step-CombiOvenCMAX'
import { CreateStepCombiOvenCMAXError } from '../../errors/create-step-CombiOvenCMAX-error'
import { StepCombiOvenCMAXParamsError } from '../../errors/step-CombiOvenCMAX-params-error'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-step-CombiOvenCMAX-controller-protocols'

export class AddStepCombiOvenCMAXController implements Controller {
  private readonly stepCombiOvenCMAXValidation: Validation
  private readonly addStepCombiOvenCMAX: AddStepCombiOvenCMAX

  constructor (stepCombiOvenCMAXValidation: Validation, addStepCombiOvenCMAX: AddStepCombiOvenCMAX) {
    this.stepCombiOvenCMAXValidation = stepCombiOvenCMAXValidation
    this.addStepCombiOvenCMAX = addStepCombiOvenCMAX
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.stepCombiOvenCMAX) return badRequest(new StepCombiOvenCMAXParamsError())
      const stepCombiOvenCMAXRequest = httpRequest.body.stepCombiOvenCMAX
      const error = this.stepCombiOvenCMAXValidation.validate(stepCombiOvenCMAXRequest)
      if (error) {
        return badRequest(error)
      }
      const stepCombiOvenCMAX = await this.addStepCombiOvenCMAX.addStepCombiOvenCMAX(stepCombiOvenCMAXRequest)
      return created<StepCombiOvenCMAXModel>(stepCombiOvenCMAX)
    } catch (error) {
      return serverError(new CreateStepCombiOvenCMAXError())
    }
  }
}
