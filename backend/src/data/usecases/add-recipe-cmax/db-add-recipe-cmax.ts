
import { AddRecipeCMAX, AddRecipeCMAXModel, RecipeCMAXModel, AddRecipeCMAXRepository } from './db-add-recipe-cmax-protocols'

export class DbAddRecipeCMAX implements AddRecipeCMAX {
  private readonly addRecipeCMAXRepository: AddRecipeCMAXRepository

  constructor (addRecipeCMAXRepository: AddRecipeCMAXRepository) {
    this.addRecipeCMAXRepository = addRecipeCMAXRepository
  }

  async addRecipeCMAX (recipe: AddRecipeCMAXModel): Promise<RecipeCMAXModel | null> {
    const recipeResult = await this.addRecipeCMAXRepository.addRecipeCMAX(recipe)
    return recipeResult
  }
}
