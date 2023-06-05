import { LoadUserByToken } from '../../domain/usecases/load-user-by-token'
import { AccessDeniedError } from '../errors'
import { forbidden, ok } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  private readonly loadAccountByToken: LoadUserByToken
  private readonly role?: string

  constructor (loadAccountByToken: LoadUserByToken, role?:string) {
    this.loadAccountByToken = loadAccountByToken
    this.role = role
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const user = await this.loadAccountByToken.load(accessToken, this.role)

        if (user) {
          return ok({ idUser: user.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return forbidden(error)
    }
  }
}
