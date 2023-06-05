import { MenuModel } from '../../../domain/models/menu'
import { AddMenu, AddMenuModel, AddMenuRepository } from './db-add-menu-protocols'

export class DbAddMenu implements AddMenu {
  private readonly addMenuRepository: AddMenuRepository

  constructor (addMenuRepository: AddMenuRepository) {
    this.addMenuRepository = addMenuRepository
  }

  async add (menuData: AddMenuModel): Promise<MenuModel> {
    const menu = await this.addMenuRepository.add(menuData)
    return menu
  }
}
