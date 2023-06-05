import { LoadRecipe, RecipeModel, LoadRecipeRepository } from './db-load-recipe-protocols'

export class DbLoadRecipe implements LoadRecipe {
  private readonly loadRecipeRepository: LoadRecipeRepository

  constructor (loadRecipeRepository: LoadRecipeRepository) {
    this.loadRecipeRepository = loadRecipeRepository
  }

  async loadRecipe (idGroup: number): Promise<RecipeModel[]> {
    const recipes: RecipeModel[] = await this.loadRecipeRepository.loadRecipe(idGroup)
    return recipes
  }
}
