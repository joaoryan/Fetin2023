import { noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { LoadUserOldByEmail } from '../../../domain/usecases/load-userOld-by-email'

export class LoadUserByEmailController implements Controller {
  private readonly loadUserByEmail: LoadUserOldByEmail

  constructor (loadUserByEmail: LoadUserOldByEmail) {
    this.loadUserByEmail = loadUserByEmail
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.params
      const response = await this.loadUserByEmail.loadUser(email)
      if (!response) return noContent()
      return ok({
        user: response
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
