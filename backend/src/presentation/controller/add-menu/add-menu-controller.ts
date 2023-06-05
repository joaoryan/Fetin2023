import { MenuModel } from '../../../domain/models/menu'
import { AddMenu } from '../../../domain/usecases/add-menu'
import { AddMenuConfigs } from '../../../domain/usecases/add-menu-configs'
import { CreateMenuError } from '../../errors/create-menu-error'
import { MenuConfigParametersError } from '../../errors/menu-config-params-error'
import { MenuParamsError } from '../../errors/menu-params-error'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-menu-controller-protocols'

export class AddMenuController implements Controller {
  private readonly menuValidation: Validation
  private readonly menuConfigsValidation: Validation
  private readonly addMenu: AddMenu
  private readonly addMenuConfigs: AddMenuConfigs

  constructor (menuValidation: Validation, menuConfigsValidation: Validation, addMenu: AddMenu, addMenuConfigs: AddMenuConfigs) {
    this.menuValidation = menuValidation
    this.menuConfigsValidation = menuConfigsValidation
    this.addMenu = addMenu
    this.addMenuConfigs = addMenuConfigs
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.menu) return badRequest(new MenuParamsError())
      const menuRequest = httpRequest.body.menu
      const menuConfigRequest = menuRequest.equipTypeId !== 4 ? httpRequest.body.menuConfigs : {}

      const error = this.menuValidation.validate(menuRequest)
      if (error) return badRequest(error)

      if (menuRequest.equipTypeId !== 4) {
        if (!httpRequest.body.menuConfigs) return badRequest(new MenuConfigParametersError())
        // const error = this.menuConfigsValidation.validate(menuConfigRequest)
        // if (error) return badRequest(error)
      }

      const menu = await this.addMenu.add(menuRequest)

      if (menuRequest.equipTypeId !== 4) {
        await this.addMenuConfigs.addConfigs(Object.assign(menuConfigRequest, { menuId: menu.id }))
      }

      return created<MenuModel>(menu)
    } catch (error) {
      return serverError(new CreateMenuError())
    }
  }
}
