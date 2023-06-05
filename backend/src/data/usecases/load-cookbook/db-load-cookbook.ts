import { LoadRecipeCookbook, RecipeCookbookModel, LoadRecipeCookbookRepository } from './db-load-cookbook-protocols'

export class DbLoadRecipeCookbook implements LoadRecipeCookbook {
  private readonly loadRecipeCookbookRepository: LoadRecipeCookbookRepository

  constructor (loadRecipeCookbookRepository: LoadRecipeCookbookRepository) {
    this.loadRecipeCookbookRepository = loadRecipeCookbookRepository
  }

  async loadRecipeCookbook (idCompany: number | null): Promise<RecipeCookbookModel[]> {
    const recipes: RecipeCookbookModel[] = await this.loadRecipeCookbookRepository.loadRecipeCookbook(idCompany)
    return recipes
  }
}
