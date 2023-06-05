import { noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadCompanyMenu, LoadCompanyMenuConfigs } from './load-menu-by-company-id-controller-protocols'

export class LoadCompanyMenuController implements Controller {
  private readonly loadCompanyMenu: LoadCompanyMenu
  private readonly loadCompanyMenuConfigs: LoadCompanyMenuConfigs

  constructor (loadCompanyMenu: LoadCompanyMenu, loadCompanyMenuConfigs: LoadCompanyMenuConfigs) {
    this.loadCompanyMenu = loadCompanyMenu
    this.loadCompanyMenuConfigs = loadCompanyMenuConfigs
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { companyId } = httpRequest.params
      const menu = await this.loadCompanyMenu.loadMenu(companyId)
      if (!menu) return noContent()

      for (const index in menu) {
        const menuConfig = await this.loadCompanyMenuConfigs.loadMenuConfigs(menu[index].id)
        Object.assign(menu[index], { configs: menuConfig })
      }

      return ok({
        menu: menu
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
