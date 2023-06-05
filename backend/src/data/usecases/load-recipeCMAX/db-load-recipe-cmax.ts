import { LoadRecipeCMAX, RecipeCMAXModel, LoadRecipeCMAXRepository } from './db-load-recipe-cmax-protocols'

export class DbLoadRecipeCMAX implements LoadRecipeCMAX {
  private readonly loadRecipeCMAXRepository: LoadRecipeCMAXRepository

  constructor (loadRecipeCMAXRepository: LoadRecipeCMAXRepository) {
    this.loadRecipeCMAXRepository = loadRecipeCMAXRepository
  }

  async loadRecipeCMAX (idMenu: number): Promise<RecipeCMAXModel[]> {
    const recipes: RecipeCMAXModel[] = await this.loadRecipeCMAXRepository.loadRecipeCMAX(idMenu)
    return recipes
  }
}
