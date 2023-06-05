import { Pool } from 'mysql'
import { mapCreatedStepCombiOvenCMAX } from './step-CombiOvenCMAX-mysql-repository-helper'
import { AddStepCombiOvenCMAXModel, AddStepCombiOvenCMAXRepository, StepCombiOvenCMAXModel } from '../../../../data/usecases/add-step-CombiOvenCMAX/db-add-step-CombiOvenCMAX-protocols'
import { insertOne, deleteById, getOne, updateAll } from '../mysql-helper'
import { DeleteStepCombiOvenCMAXRepository, LoadStepCombiOvenCMAXRepository } from '../../../../data/usecases/delete-step-CombiOvenCMAX/db-delete-step-CombiOvenCMAX-protocols'
import { UpdateStepCombiOvenCMAXRepository } from '../../../../data/usecases/update-step-CombiOvenCMAX/db-update-step-CombiOvenCMAX-protocols'

export class StepCombiOvenCMAXMySqlRepository implements AddStepCombiOvenCMAXRepository, DeleteStepCombiOvenCMAXRepository, UpdateStepCombiOvenCMAXRepository, LoadStepCombiOvenCMAXRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async addStepCombiOvenCMAX (stepCombiOvenCMAXData: AddStepCombiOvenCMAXModel): Promise<StepCombiOvenCMAXModel> {
    const result = await insertOne(this.connectionPool, 'stepCombiOvenCMAX', stepCombiOvenCMAXData)
    return mapCreatedStepCombiOvenCMAX(stepCombiOvenCMAXData, result.insertId)
  }

  async deleteStepCombiOvenCMAX (id: number): Promise<boolean> {
    const result = await deleteById(this.connectionPool, 'stepCombiOvenCMAX', 'id', id)
    if (result.affectedRows === 0) return false
    return true
  }

  async loadStepCombiOvenCMAX (idRecipe: number): Promise<StepCombiOvenCMAXModel[]> {
    const result = await getOne(this.connectionPool, 'stepCombiOvenCMAX', 'recipeId', idRecipe)
    return result
  }

  async updateStepCombiOvenCMAX (id: number, stepCombiOvenCMAXData: StepCombiOvenCMAXModel): Promise<boolean> {
    const setFields = Object.entries(stepCombiOvenCMAXData)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')
    const result = await updateAll(this.connectionPool, 'stepCombiOvenCMAX', setFields, id)
    return result
  }
}
