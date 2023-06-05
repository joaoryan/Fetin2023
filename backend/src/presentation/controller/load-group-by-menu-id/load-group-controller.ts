import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadMenuGroup, Validation } from './load-group-controller-protocols'

export class LoadGroupController implements Controller {
  private readonly validation: Validation
  private readonly loadMenuGroup: LoadMenuGroup

  constructor (validation: Validation, loadMenuGroup: LoadMenuGroup) {
    this.validation = validation
    this.loadMenuGroup = loadMenuGroup
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { menuId } = httpRequest.params
      const response = await this.loadMenuGroup.loadMenuGroup(menuId)
      if (!response) return noContent()
      return ok({
        groups: response
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
