/* eslint-disable eol-last */
import { UpdateMenu } from '../../../domain/usecases/Update-menu'
import { UpdateMenuConfigs, UpdateMenuConfigsModel } from '../../../domain/usecases/Update-menu-configs'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './Update-menu-controller-protocols'

export class UpdateMenuController implements Controller {
  private readonly UpdateMenuValidation: Validation
  private readonly UpdateMenuConfigsValidation: Validation
  private readonly UpdateMenu: UpdateMenu
  private readonly UpdateMenuConfigs: UpdateMenuConfigs

  constructor (UpdateMenuValidation: Validation, UpdateMenuConfigsValidation: Validation, UpdateMenu: UpdateMenu, UpdateMenuConfigs: UpdateMenuConfigs) {
    this.UpdateMenuValidation = UpdateMenuValidation
    this.UpdateMenuConfigsValidation = UpdateMenuConfigsValidation
    this.UpdateMenu = UpdateMenu
    this.UpdateMenuConfigs = UpdateMenuConfigs
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.menu) return badRequest(new MissingParamError('menu'))
      const menuError = this.UpdateMenuValidation.validate(httpRequest.body.menu)
      if (menuError) return badRequest(menuError)

      const menu = httpRequest.body.menu
      await this.UpdateMenu.updateMenu(menu)

      if (httpRequest.body.menu.equipTypeId !== 4) {
        if (!httpRequest.body.menuConfigs) return badRequest(new MissingParamError('menuConfig'))
        const menuConfig: UpdateMenuConfigsModel = httpRequest.body.menuConfigs
        console.log(menuConfig)
        const menuConfigsError = this.UpdateMenuConfigsValidation.validate(menuConfig)
        if (menuConfigsError) return badRequest(menuConfigsError)
        await this.UpdateMenuConfigs.updateMenuConfigs(menuConfig)
      }
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
