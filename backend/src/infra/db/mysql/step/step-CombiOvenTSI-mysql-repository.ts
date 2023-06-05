import { Pool } from 'mysql'
import { mapCreatedStepCombiOvenTSI } from './step-CombiOvenTSI-mysql-repository-helper'
import { AddStepCombiOvenTSIModel, AddStepCombiOvenTSIRepository, StepCombiOvenTSIModel } from '../../../../data/usecases/add-step-CombiOvenTSI/db-add-step-CombiOvenTSI-protocols'
import { insertOne, deleteById, getOne, updateAll } from '../mysql-helper'
import { DeleteStepCombiOvenTSIRepository, LoadStepCombiOvenTSIRepository } from '../../../../data/usecases/delete-step-CombiOvenTSI/db-delete-step-CombiOvenTSI-protocols'
import { UpdateStepCombiOvenTSIRepository } from '../../../../data/usecases/update-step-CombiOvenTSI/db-update-step-CombiOvenTSI-protocols'

export class StepCombiOvenTSIMySqlRepository implements AddStepCombiOvenTSIRepository, DeleteStepCombiOvenTSIRepository, UpdateStepCombiOvenTSIRepository, LoadStepCombiOvenTSIRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async addStepCombiOvenTSI (stepCombiOvenTSIData: AddStepCombiOvenTSIModel): Promise<StepCombiOvenTSIModel> {
    const result = await insertOne(this.connectionPool, 'stepCombiOvenTSI', stepCombiOvenTSIData)
    return mapCreatedStepCombiOvenTSI(stepCombiOvenTSIData, result.insertId)
  }

  async deleteStepCombiOvenTSI (id: number): Promise<boolean> {
    const result = await deleteById(this.connectionPool, 'stepCombiOvenTSI', 'id', id)
    if (result.affectedRows === 0) return false
    return true
  }

  async loadStepCombiOvenTSI (idRecipe: number): Promise<StepCombiOvenTSIModel[]> {
    const result = await getOne(this.connectionPool, 'stepCombiOvenTSI', 'recipeId', idRecipe)
    return result
  }

  async updateStepCombiOvenTSI (id: number, stepCombiOvenTSIData: StepCombiOvenTSIModel): Promise<boolean> {
    const setFields = Object.entries(stepCombiOvenTSIData)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')
    const result = await updateAll(this.connectionPool, 'stepCombiOvenTSI', setFields, id)
    return result
  }
}
