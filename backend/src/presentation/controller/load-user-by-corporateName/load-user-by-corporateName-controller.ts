import { noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { LoadUserByCorporateName } from '../../../domain/usecases/load-user-by-corporateName'

export class LoadUserByCorporateNameController implements Controller {
  private readonly loadUserByCorporateName: LoadUserByCorporateName

  constructor (loadUserByCorporateName: LoadUserByCorporateName) {
    this.loadUserByCorporateName = loadUserByCorporateName
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { corporateName } = httpRequest.params
      const response = await this.loadUserByCorporateName.loadUser(corporateName)
      console.log(response)
      if (!response) return noContent()
      return ok({
        user: response
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
