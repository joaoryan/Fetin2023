import { Pool } from 'mysql'
import { mapCreatedRecipe } from './recipe-mysql-repository-helper'
import { mapCreatedRecipeCMAX } from './recipeCMAX-mysql-repository-helper'
import { LoadRecipeCMAXRepository } from '../../../../data/protocols/db/recipe/load-recipe-cmax-repository'
import { LoadRecipeRepository, RecipeModel } from '../../../../data/usecases/load-recipe/db-load-recipe-protocols'
import { LoadStepCombiOvenTSIRepository } from '../../../../data/protocols/db/recipe/load-step-CombiOvenTSI-repository'
import { LoadStepCombiOvenCMAXRepository } from '../../../../data/protocols/db/recipe/load-step-CombiOvenCMAX-repository'
import { DeleteRecipeCMAXRepository } from '../../../../data/protocols/db/recipe/delete-recipe-cmax-repository'
import { DeleteRecipeRepository } from '../../../../data/protocols/db/recipe/delete-recipe-repository'
import { DeleteCombiOvenTSIRepository } from '../../../../data/protocols/db/recipe/delete-step-CombiOvenTSI-repository'
import { DeleteCombiOvenCMAXRepository } from '../../../../data/protocols/db/recipe/delete-step-CombiOvenCMAX-repository'
import { AddRecipeRepository } from '../../../../data/protocols/db/recipe/add-recipe-repository'
import { AddRecipeCMAXRepository } from '../../../../data/protocols/db/recipe/add-recipe-cmax-repository'
import { UpdateRecipeRepository } from '../../../../data/protocols/db/recipe/update-recipe-repository'
import { UpdateRecipeCMAXRepository } from '../../../../data/protocols/db/recipe/update-recipe-cmax-repository'
import { LoadRecipeByIdRepository } from '../../../../data/protocols/db/recipe/load-recipe-by-id-repository'
import { LoadRecipeCMAXByIdRepository } from '../../../../data/protocols/db/recipe/load-recipe-cmax-by-id-repository'
import { RecipeCMAXModel } from '../../../../domain/models/recipeCMAX'
import { StepSpeedOvenModel } from '../../../../domain/models/stepSpeedOven'
import { StepCombiOvenTSIModel } from '../../../../domain/models/stepCombiOvenTSI'
import { StepCombiOvenCMAXModel } from '../../../../domain/models/stepCombiOvenCMAX'
import { customGet, deleteById, getOne, insertOne, updateAll } from '../mysql-helper'
import { AddRecipeModel } from '../../../../domain/usecases/add-recipe'
import { AddRecipeCMAXModel } from '../../../../domain/usecases/add-recipeCMAX'
import { UpdateRecipeModel } from '../../../../domain/usecases/update-recipe'
import { UpdateRecipeCmaxModel } from '../../../../domain/usecases/Update-recipeCMAX'

export class RecipeMySqlRepository implements LoadRecipeCMAXRepository, LoadRecipeRepository, LoadStepCombiOvenTSIRepository, LoadStepCombiOvenCMAXRepository, DeleteRecipeCMAXRepository,
  DeleteRecipeRepository, DeleteCombiOvenTSIRepository, DeleteCombiOvenCMAXRepository, AddRecipeRepository, AddRecipeCMAXRepository, UpdateRecipeRepository, UpdateRecipeCMAXRepository, LoadRecipeByIdRepository, LoadRecipeCMAXByIdRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async loadRecipeCMAXById (id: number): Promise<RecipeCMAXModel> {
    const result = await getOne(this.connectionPool, 'cmaxRecipe', 'id', id)
    return result[0]
  }

  async loadRecipeById (id: number): Promise<RecipeModel> {
    const result = await getOne(this.connectionPool, 'recipe', 'id', id)
    return result[0]
  }

  async updateRecipeCMAX (recipeData: UpdateRecipeCmaxModel): Promise<RecipeCMAXModel> {
    const setFields = Object.entries(recipeData)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')
    const recipeCmax = await updateAll(this.connectionPool, 'cmaxRecipe', setFields, recipeData.id)
    return recipeCmax
  }

  async updateRecipe (recipeData: UpdateRecipeModel): Promise<RecipeModel> {
    const setFields = Object.entries(recipeData)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')
    const recipe = await updateAll(this.connectionPool, 'recipe', setFields, recipeData.id)
    return recipe
  }

  async addRecipeCMAX (recipeData: AddRecipeCMAXModel): Promise<RecipeCMAXModel> {
    const result = await insertOne(this.connectionPool, 'cmaxRecipe', recipeData)
    return mapCreatedRecipeCMAX(recipeData, result.insertId)
  }

  async addRecipe (recipeData: AddRecipeModel): Promise<RecipeModel> {
    const result = await insertOne(this.connectionPool, 'recipe', recipeData)
    return mapCreatedRecipe(recipeData, result.insertId)
  }

  async deleteRecipeCMAX (id: number): Promise<void> {
    await deleteById(this.connectionPool, 'cmaxRecipe', 'id', id)
  }

  async loadRecipeCMAX (idMenu: number): Promise<RecipeCMAXModel[]> {
    const result = await getOne(this.connectionPool, 'cmaxRecipe', 'menuId', idMenu)
    for (let i = 0; i < result.length; i++) {
      const recipeCount = await customGet(this.connectionPool, `SELECT COUNT(*) as count FROM stepCombiOvenCMAX WHERE recipeId = ${result[i].id}`)
      const temp = { stepCount: recipeCount[0].count + 1 }
      Object.assign(result[i], temp)
    }
    return result
  }

  async loadRecipe (idGroup: number): Promise<RecipeModel[]> {
    const result = await getOne(this.connectionPool, 'recipe', 'groupId', idGroup)
    return result
  }

  async loadStepCombiOvenCMAX (idRecipe: number): Promise<StepCombiOvenCMAXModel[]> {
    const result = await getOne(this.connectionPool, 'stepCombiOvenCMAX', 'recipeId', idRecipe)
    return result
  }

  async loadStepCombiOvenTSI (idRecipe: number): Promise<StepCombiOvenTSIModel[]> {
    const result = await getOne(this.connectionPool, 'stepCombiOvenTSI', 'recipeId', idRecipe)
    return result
  }

  async loadStepSpeedOven (idRecipe: number): Promise<StepSpeedOvenModel[]> {
    const result = await getOne(this.connectionPool, 'stepSpeedOven', 'recipeId', idRecipe)
    return result
  }

  async deleteRecipe (id: number): Promise<void> {
    await deleteById(this.connectionPool, 'recipe', 'id', id)
  }

  async deleteCombiOvenCMAX (id: number): Promise<void> {
    await deleteById(this.connectionPool, 'stepCombiOvenCMAX', 'recipeId', id)
  }

  async deleteCombiOvenTSI (id: number): Promise<void> {
    await deleteById(this.connectionPool, 'stepCombiOvenTSI', 'recipeId', id)
  }

  async deleteSpeedOven (id: number): Promise<void> {
    await deleteById(this.connectionPool, 'stepSpeedOven', 'recipeId', id)
  }
}
