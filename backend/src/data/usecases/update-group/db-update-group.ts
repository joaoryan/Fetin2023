import { UpdateGroup, UpdateGroupModel, MenuGroupModel, UpdateGroupRepository } from './db-update-group-protocols'

export class DbUpdateGroup implements UpdateGroup {
  private readonly UpdateGroupRepository: UpdateGroupRepository

  constructor (UpdateGroupRepository: UpdateGroupRepository) {
    this.UpdateGroupRepository = UpdateGroupRepository
  }

  async updateGroup (group: UpdateGroupModel): Promise<MenuGroupModel> {
    const groups = await this.UpdateGroupRepository.updateGroup(group)
    if (groups) {
      return groups
    }
    return null
  }
}
