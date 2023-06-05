import { DeleteMenu } from '../../../domain/usecases/delete-menu'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-menu-controller-protocols'

export class DeleteMenuController implements Controller {
  private readonly deleteMenuValidation: Validation
  private readonly deleteMenu: DeleteMenu

  constructor (deleteMenuValidation: Validation, deleteMenu: DeleteMenu) {
    this.deleteMenuValidation = deleteMenuValidation
    this.deleteMenu = deleteMenu
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const error = this.deleteMenuValidation.validate(httpRequest.params)
      if (error) return badRequest(new MissingParamError('id'))
      if (typeof (id) === 'undefined') return badRequest(new InvalidParamError('id'))
      await this.deleteMenu.deleteMenu(id)
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
