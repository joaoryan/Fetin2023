import { LoadUserTypes } from '../../../domain/usecases/load-userTypes'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class LoadUserTypesController implements Controller {
  private readonly loadUserTypes: LoadUserTypes
  private readonly validation: Validation
  constructor (loadUserTypes: LoadUserTypes, validation: Validation) {
    this.loadUserTypes = loadUserTypes
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { companyTypeId } = httpRequest.params
      const userTypes = await this.loadUserTypes.loadByCompanyTypeId(companyTypeId)
      return ok(userTypes)
    } catch (error) {
      return serverError(error)
    }
  }
}
