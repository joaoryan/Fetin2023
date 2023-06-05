import { UpdateMenuConfigs, UpdateMenuConfigsModel, UpdateMenuConfigsRepository } from './db-update-menu-configs-protocols'

export class DbUpdateMenuConfigs implements UpdateMenuConfigs {
  private readonly UpdateMenuConfigsRepository: UpdateMenuConfigsRepository

  constructor (UpdateMenuConfigsRepository: UpdateMenuConfigsRepository) {
    this.UpdateMenuConfigsRepository = UpdateMenuConfigsRepository
  }

  async updateMenuConfigs (menuConfigs: UpdateMenuConfigsModel): Promise<void> {
    await this.UpdateMenuConfigsRepository.updateMenuConfigs(menuConfigs)
  }
}
