import { LoadCompanyMenu, MenuModel, LoadCompanyMenuRepository } from './db-load-company-menu-protocols'

export class DbLoadCompanyMenu implements LoadCompanyMenu {
  private readonly loadCompanyMenuRepository: LoadCompanyMenuRepository

  constructor (loadCompanyMenuRepository: LoadCompanyMenuRepository) {
    this.loadCompanyMenuRepository = loadCompanyMenuRepository
  }

  async loadMenu (idCompany: number): Promise<MenuModel[] | null> {
    const menu: MenuModel[] = await this.loadCompanyMenuRepository.loadMenu(idCompany)
    if (menu.length !== 0) {
      return menu
    }
    return null
  }
}
