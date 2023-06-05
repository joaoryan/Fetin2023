import { DeleteMenu, DeleteMenuRepository } from './db-delete-menu-protocols'

export class DbDeleteMenu implements DeleteMenu {
  private readonly deleteMenuRepository: DeleteMenuRepository

  constructor (deleteMenuRepository: DeleteMenuRepository) {
    this.deleteMenuRepository = deleteMenuRepository
  }

  async deleteMenu (id: number): Promise<boolean> {
    const result = await this.deleteMenuRepository.deleteMenu(id)
    return result
  }
}
