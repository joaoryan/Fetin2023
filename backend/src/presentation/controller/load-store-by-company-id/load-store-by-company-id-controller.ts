import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadStoresByCompanyId, Validation } from './load-store-by-company-id-controller-protocols'

export class LoadStoresByCompanyIdController implements Controller {
  private readonly loadStoresByCompanyId: LoadStoresByCompanyId
  private readonly validation: Validation

  constructor (loadStoresByCompanyId: LoadStoresByCompanyId, validation: Validation) {
    this.loadStoresByCompanyId = loadStoresByCompanyId
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { companyId, userId, userPrivilegeUser } = httpRequest.params
      const response = await this.loadStoresByCompanyId.loadStoresByCompanyId(companyId, userId, userPrivilegeUser)
      if (!response) {
        return noContent()
      }
      return ok({ stores: response })
    } catch (error) {
      return serverError(error)
    }
  }
}
