import { LoadEquipByCompanyId } from '../../../domain/usecases/load-equip-by-company-id'
import { ServerError } from '../../errors'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class LoadEquipByCompanyIdController implements Controller {
  private readonly loadEquipByCompanyId: LoadEquipByCompanyId
  private readonly validation: Validation
  constructor (loadEquipByCompanyId: LoadEquipByCompanyId, validation: Validation) {
    this.loadEquipByCompanyId = loadEquipByCompanyId
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest<LoadEquipByCompanyId.Request>): Promise<HttpResponse<LoadEquipByCompanyId.Response>> {
    try {
      const validationError = this.validation.validate(httpRequest.params)
      if (validationError) return badRequest(validationError)
      const { companyId, userId, userPrivilegeUser } = httpRequest.params
      const response = await this.loadEquipByCompanyId.load(companyId, userId, userPrivilegeUser)
      if (response.length === 0) return noContent()
      return ok(response)
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
