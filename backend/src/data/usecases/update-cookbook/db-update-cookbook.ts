import { UpdateCookbook, UpdateCookbookModel } from '../../../domain/usecases/update-cookbook'
import { UpdateCookbookRepository } from '../../protocols/db/cookbook/update-cookbook-repository'

export class DbUpdateCookbook implements UpdateCookbook {
  private readonly updateCookbookRepository: UpdateCookbookRepository

  constructor (updateCookbookRepository: UpdateCookbookRepository) {
    this.updateCookbookRepository = updateCookbookRepository
  }

  async update (id: number, cookbook: UpdateCookbookModel): Promise<boolean> {
    return await this.updateCookbookRepository.updateCookbook(id, cookbook)
  }
}
