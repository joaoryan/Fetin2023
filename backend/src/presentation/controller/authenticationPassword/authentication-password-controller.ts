import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, AuthenticationPassword, Validation } from './authentication-password-controller-protocols'

export class AuthenticationPasswordController implements Controller {
  private readonly authentication: AuthenticationPassword
  private readonly validation: Validation

  constructor (authentication: AuthenticationPassword, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const authenticationPassword = await this.authentication.auth({
        email,
        password
      })
      if (!authenticationPassword) {
        return unauthorized()
      }
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
