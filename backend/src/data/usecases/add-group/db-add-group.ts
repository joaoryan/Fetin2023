import { AddGroup, AddGroupModel, MenuGroupModel, AddGroupRepository } from './db-add-group-protocols'

export class DbAddGroup implements AddGroup {
  private readonly addGroupRepository: AddGroupRepository

  constructor (addGroupRepository: AddGroupRepository) {
    this.addGroupRepository = addGroupRepository
  }

  async addGroup (group: AddGroupModel): Promise<MenuGroupModel> {
    const groupResult = await this.addGroupRepository.addGroup(group)
    return groupResult
  }
}
