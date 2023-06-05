import { AddMenuConfigs, AddMenuConfigsRepository, AddMenuConfigsModel } from './db-menu-configs-protocols'

export class DbAddMenuConfigs implements AddMenuConfigs {
  private readonly addMenuRepository: AddMenuConfigsRepository

  constructor (addMenuRepository: AddMenuConfigsRepository) {
    this.addMenuRepository = addMenuRepository
  }

  async addConfigs (menuConfigsData: AddMenuConfigsModel): Promise<void> {
    await this.addMenuRepository.addConfig(menuConfigsData)
  }
}
