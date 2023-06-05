import { LoadEquipByMenu, EquipModel, LoadEquipByMenuRepository } from './db-load-equip-by-menu-protocols'

export class DbLoadEquipByMenu implements LoadEquipByMenu {
  private readonly loadEquipByMenuRepository: LoadEquipByMenuRepository

  constructor (loadEquipByMenuRepository: LoadEquipByMenuRepository) {
    this.loadEquipByMenuRepository = loadEquipByMenuRepository
  }

  async loadEquip (menuId: number): Promise<EquipModel[] | null> {
    const equip: EquipModel[] = await this.loadEquipByMenuRepository.loadByEquipMenu(menuId)
    if (equip.length !== 0) {
      return equip
    }
    return null
  }
}
