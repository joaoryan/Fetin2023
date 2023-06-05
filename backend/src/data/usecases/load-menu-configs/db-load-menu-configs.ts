import { LoadCompanyMenuConfigs, MenuConfigsModel, LoadCompanyMenuCofigRepository } from './db-load-menu-configs-protocols'

export class DbLoadCompanyMenuConfigs implements LoadCompanyMenuConfigs {
  private readonly loadCompanyMenuConfigRepository: LoadCompanyMenuCofigRepository

  constructor (loadCompanyMenuConfigRepository: LoadCompanyMenuCofigRepository) {
    this.loadCompanyMenuConfigRepository = loadCompanyMenuConfigRepository
  }

  async loadMenuConfigs (idMenu: number): Promise<MenuConfigsModel | null> {
    const menu: MenuConfigsModel = await this.loadCompanyMenuConfigRepository.loadMenuConfig(idMenu)
    if (menu) {
      return menu
    }
    return null
  }
}
