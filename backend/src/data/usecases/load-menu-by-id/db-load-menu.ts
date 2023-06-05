import { LoadMenuById, MenuModel, LoadMenuRepository } from './db-load-user-menu-protocols'

export class DbLoadMenu implements LoadMenuById {
  private readonly loadMenuRepository: LoadMenuRepository

  constructor (loadMenuRepository: LoadMenuRepository) {
    this.loadMenuRepository = loadMenuRepository
  }

  async loadMenu (id: number): Promise<MenuModel | null> {
    const menu: MenuModel = await this.loadMenuRepository.loadMenuById(id)
    if (menu) {
      return menu
    }
    return null
  }
}
