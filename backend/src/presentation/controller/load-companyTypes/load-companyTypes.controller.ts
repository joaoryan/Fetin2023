import { LoadCompanyTypes } from '../../../domain/usecases/load-companyTypes'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class LoadCompanyTypesController implements Controller {
  private readonly loadCompanyTypes: LoadCompanyTypes
  private readonly validation: Validation
  constructor (loadCompanyTypes: LoadCompanyTypes, validation: Validation) {
    this.loadCompanyTypes = loadCompanyTypes
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const companyTypes = await this.loadCompanyTypes.load()
      return ok(companyTypes)
    } catch (error) {
      return serverError(error)
    }
  }
}
