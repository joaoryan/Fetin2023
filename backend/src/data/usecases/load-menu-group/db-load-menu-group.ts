import { LoadMenuGroup, MenuGroupModel, LoadMenuGroupRepository } from './db-load-menu-group-protocols'

export class DbLoadMenuGroup implements LoadMenuGroup {
  private readonly loadMenuGroupRepository: LoadMenuGroupRepository

  constructor (loadMenuGroupRepository: LoadMenuGroupRepository) {
    this.loadMenuGroupRepository = loadMenuGroupRepository
  }

  async loadMenuGroup (idMenu: number): Promise<MenuGroupModel[]> {
    const groups: MenuGroupModel[] = await this.loadMenuGroupRepository.loadMenuGroup(idMenu)
    return groups
  }
}
