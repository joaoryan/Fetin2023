import { Pool } from 'mysql'
import { mapCreatedStepSpeedOven } from './step-SpeedOven-mysql-repository-helper'
import { AddStepSpeedOvenModel, AddStepSpeedOvenRepository, StepSpeedOvenModel } from '../../../../data/usecases/add-step-SpeedOven/db-add-step-SpeedOven-protocols'
import { insertOne, deleteById, getOne, updateAll } from '../mysql-helper'
import { DeleteStepSpeedOvenRepository, LoadStepSpeedOvenByIdRepository } from '../../../../data/usecases/delete-step-SpeedOven/db-delete-step-SpeedOven-protocols'
import { UpdateStepSpeedOvenRepository } from '../../../../data/usecases/update-step-SpeedOven/db-update-step-SpeedOven-protocols'
import { LoadStepsSpeedOvenByRecipeIdRepository } from '../../../../data/usecases/load-step-SpeedOven-by-id/db-load-step-SpeedOven-by-id-protocols'

export class StepSpeedOvenMySqlRepository implements AddStepSpeedOvenRepository, DeleteStepSpeedOvenRepository, UpdateStepSpeedOvenRepository, LoadStepSpeedOvenByIdRepository, LoadStepsSpeedOvenByRecipeIdRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async addStepSpeedOven (stepSpeedOvenData: AddStepSpeedOvenModel): Promise<StepSpeedOvenModel> {
    const result = await insertOne(this.connectionPool, 'stepSpeedOven', stepSpeedOvenData)
    return mapCreatedStepSpeedOven(stepSpeedOvenData, result.insertId)
  }

  async deleteStepSpeedOven (id: number): Promise<boolean> {
    const result = await deleteById(this.connectionPool, 'stepSpeedOven', 'id', id)
    if (result.affectedRows === 0) return false
    return true
  }

  async loadStepSpeedOvenById (id: number): Promise<StepSpeedOvenModel> {
    const result = await getOne(this.connectionPool, 'stepSpeedOven', 'id', id)
    return result[0]
  }

  async loadStepsSpeedOvenByRecipeId (idRecipe: number): Promise<StepSpeedOvenModel[]> {
    const result = await getOne(this.connectionPool, 'stepSpeedOven', 'recipeId', idRecipe)
    return result
  }

  async updateStepSpeedOven (id: number, stepSpeedOvenData: StepSpeedOvenModel): Promise<boolean> {
    const setFields = Object.entries(stepSpeedOvenData)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')
    const result = await updateAll(this.connectionPool, 'stepSpeedOven', setFields, id)
    return result
  }
}
