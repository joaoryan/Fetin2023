import { DeleteRecipe, DeleteRecipeCMAXRepository, DeleteRecipeRepository, DeleteStepSpeedOvenRepository, DeleteCombiOvenTSIRepository, DeleteCombiOvenCMAXRepository } from './db-delete-recipe-protocols'

export class DbDeleteRecipe implements DeleteRecipe {
  private readonly deleteRecipeRepository: DeleteRecipeRepository
  private readonly deleteRecipeCMAXRepository: DeleteRecipeCMAXRepository
  private readonly deleteStepSpeedOvenRepository: DeleteStepSpeedOvenRepository
  private readonly deleteCombiOvenTSIRepository: DeleteCombiOvenTSIRepository
  private readonly deleteCombiOvenCMAXRepository: DeleteCombiOvenCMAXRepository

  constructor (deleteRecipeRepository: DeleteRecipeRepository, deleteRecipeCMAXRepository: DeleteRecipeCMAXRepository, deleteStepSpeedOvenRepository: DeleteStepSpeedOvenRepository, deleteCombiOvenTSIRepository: DeleteCombiOvenTSIRepository, deleteCombiOvenCMAXRepository: DeleteCombiOvenCMAXRepository) {
    this.deleteRecipeRepository = deleteRecipeRepository
    this.deleteRecipeCMAXRepository = deleteRecipeCMAXRepository
    this.deleteStepSpeedOvenRepository = deleteStepSpeedOvenRepository
    this.deleteCombiOvenTSIRepository = deleteCombiOvenTSIRepository
    this.deleteCombiOvenCMAXRepository = deleteCombiOvenCMAXRepository
  }

  async deleteRecipe (id: number, equipTypeId: number): Promise<void> {
    if (equipTypeId === 4) {
      await this.deleteCombiOvenCMAXRepository.deleteCombiOvenCMAX(id)
      await this.deleteRecipeCMAXRepository.deleteRecipeCMAX(id)
    } else {
      if (equipTypeId === 2) {
        await this.deleteCombiOvenTSIRepository.deleteCombiOvenTSI(id)
      } else {
        await this.deleteStepSpeedOvenRepository.deleteSpeedOven(id)
      }
      await this.deleteRecipeRepository.deleteRecipe(id)
    }
  }
}
