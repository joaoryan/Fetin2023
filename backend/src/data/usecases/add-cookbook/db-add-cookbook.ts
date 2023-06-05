import { AddCookbook, AddCookbookModel } from '../../../domain/usecases/add-cookbook'
import { AddCookbookRepository } from '../../protocols/db/cookbook/add-cookbook-repository'
import { RecipeCookbookModel } from '../load-cookbook/db-load-cookbook-protocols'

export class DbAddCookbook implements AddCookbook {
  private readonly addCookbookRepository: AddCookbookRepository

  constructor (addCookbookRepository: AddCookbookRepository) {
    this.addCookbookRepository = addCookbookRepository
  }

  async addCookbook (cookbook: AddCookbookModel): Promise<RecipeCookbookModel> {
    const cookbookResult = await this.addCookbookRepository.addCookbook(cookbook)
    return cookbookResult
  }
}
