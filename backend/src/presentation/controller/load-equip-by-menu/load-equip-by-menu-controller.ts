import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadEquipByMenu, Validation } from './load-user-menu-controller-protocols'

export class LoadEquipByMenuController implements Controller {
  private readonly loadEquipByMenuValidation: Validation
  private readonly loadEquipByMenu: LoadEquipByMenu

  constructor (loadUserMenuValidation: Validation, loadEquipByMenu: LoadEquipByMenu) {
    this.loadEquipByMenuValidation = loadUserMenuValidation
    this.loadEquipByMenu = loadEquipByMenu
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const Error = this.loadEquipByMenuValidation.validate(httpRequest.params)
      if (Error) {
        return badRequest(Error)
      }

      const { idMenu } = httpRequest.params
      const equip = await this.loadEquipByMenu.loadEquip(idMenu)

      return ok({
        equipment: equip
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
