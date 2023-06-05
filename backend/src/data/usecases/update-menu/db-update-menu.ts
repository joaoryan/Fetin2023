import { UpdateMenu, UpdateMenuModel, UpdateMenuRepository } from './db-update-menu-protocols'

export class DbUpdateMenu implements UpdateMenu {
  private readonly UpdateMenuRepository: UpdateMenuRepository

  constructor (UpdateMenuRepository: UpdateMenuRepository) {
    this.UpdateMenuRepository = UpdateMenuRepository
  }

  async updateMenu (menu: UpdateMenuModel): Promise<void> {
    await this.UpdateMenuRepository.updateMenu(menu)
  }
}
