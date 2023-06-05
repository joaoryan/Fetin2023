import { StepCombiOvenTSIModel } from '../../../domain/models/stepCombiOvenTSI'
import { AddStepCombiOvenTSI } from '../../../domain/usecases/add-step-CombiOvenTSI'
import { CreateStepCombiOvenTSIError } from '../../errors/create-step-CombiOvenTSI-error'
import { StepCombiOvenTSIParamsError } from '../../errors/step-CombiOvenTSI-params-error'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-step-CombiOvenTSI-controller-protocols'

export class AddStepCombiOvenTSIController implements Controller {
  private readonly stepCombiOvenTSIValidation: Validation
  private readonly addStepCombiOvenTSI: AddStepCombiOvenTSI

  constructor (stepCombiOvenTSIValidation: Validation, addStepCombiOvenTSI: AddStepCombiOvenTSI) {
    this.stepCombiOvenTSIValidation = stepCombiOvenTSIValidation
    this.addStepCombiOvenTSI = addStepCombiOvenTSI
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.stepCombiOvenTSI) return badRequest(new StepCombiOvenTSIParamsError())
      const stepCombiOvenTSIRequest = httpRequest.body.stepCombiOvenTSI
      const error = this.stepCombiOvenTSIValidation.validate(stepCombiOvenTSIRequest)
      if (error) {
        return badRequest(error)
      }
      const stepCombiOvenTSI = await this.addStepCombiOvenTSI.addStepCombiOvenTSI(stepCombiOvenTSIRequest)
      return created<StepCombiOvenTSIModel>(stepCombiOvenTSI)
    } catch (error) {
      return serverError(new CreateStepCombiOvenTSIError())
    }
  }
}
