import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { LoadUserByCompany } from '../../../domain/usecases/load-user-by-company'

export class LoadUserByCompanyController implements Controller {
  private readonly loadRecipeValidation: Validation
  private readonly loadUserByCompany: LoadUserByCompany

  constructor (loadRecipeValidation: Validation, loadUserByCompany: LoadUserByCompany) {
    this.loadRecipeValidation = loadRecipeValidation
    this.loadUserByCompany = loadUserByCompany
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.loadRecipeValidation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { id } = httpRequest.params
      const response = await this.loadUserByCompany.loadUser(id)
      if (!response) return noContent()
      return ok({
        users: response
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
