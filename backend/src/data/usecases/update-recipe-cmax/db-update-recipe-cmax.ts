import { UpdateRecipeCMAX, RecipeCMAXModel, UpdateRecipeCMAXRepository, UpdateRecipeCmaxModel } from './db-update-recipe-cmax-protocols'

export class DbUpdateRecipeCMAX implements UpdateRecipeCMAX {
  private readonly UpdateRecipeCMAXRepository: UpdateRecipeCMAXRepository

  constructor (UpdateRecipeCMAXRepository: UpdateRecipeCMAXRepository) {
    this.UpdateRecipeCMAXRepository = UpdateRecipeCMAXRepository
  }

  async updateRecipeCMAX (recipe: UpdateRecipeCmaxModel): Promise<RecipeCMAXModel> {
    const recipeResult = await this.UpdateRecipeCMAXRepository.updateRecipeCMAX(recipe)
    return recipeResult
  }
}
