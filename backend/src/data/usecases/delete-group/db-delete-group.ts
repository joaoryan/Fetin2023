import { DeleteGroup, DeleteGroupRepository } from './db-delete-group-protocols'

export class DbDeleteGroup implements DeleteGroup {
  private readonly deleteGroupRepository: DeleteGroupRepository

  constructor (deleteGroupRepository: DeleteGroupRepository) {
    this.deleteGroupRepository = deleteGroupRepository
  }

  async deleteGroup (id: number): Promise<boolean> {
    return await this.deleteGroupRepository.deleteGroup(id)
  }
}
