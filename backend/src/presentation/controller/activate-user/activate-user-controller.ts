import { Controller, HttpRequest, HttpResponse, Validation } from './activate-user-controller-protocols'
import { UpdateUserByActivationCode } from '../../../domain/usecases/Update-user-by-activation-code'
import { badRequest, noContent, serverError } from '../../helpers/http-helper'

export class ActivateUserController implements Controller {
  private readonly validation: Validation
  private readonly activation: UpdateUserByActivationCode

  constructor (validation: Validation, activation: UpdateUserByActivationCode) {
    this.validation = validation
    this.activation = activation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { activateToken } = httpRequest.body
      await this.activation.updateActivationCode(activateToken)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
