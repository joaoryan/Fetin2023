import { LoadPermissionTypes } from '../../../domain/usecases/load-permissionTypes'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class LoadPermissionTypesController implements Controller {
  private readonly loadPermissionTypes: LoadPermissionTypes
  private readonly validation: Validation
  constructor (loadPermissionTypes: LoadPermissionTypes, validation: Validation) {
    this.loadPermissionTypes = loadPermissionTypes
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params
      const permissionTypes = await this.loadPermissionTypes.load(id)
      return ok(permissionTypes)
    } catch (error) {
      return serverError(error)
    }
  }
}
