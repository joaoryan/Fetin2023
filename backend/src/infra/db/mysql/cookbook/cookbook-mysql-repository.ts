import { Pool } from 'mysql'
import { deleteById, getOne, insertOne, updateAll } from '../mysql-helper'
import { LoadRecipeCookbookRepository } from '../../../../data/protocols/db/cookbook/load-recipe-repository'
import { RecipeCookbookModel } from '../../../../domain/models/recipe-cookbook'
import { AddCookbookRepository } from '../../../../data/protocols/db/cookbook/add-cookbook-repository'
import { DeleteCookbookRepository } from '../../../../data/protocols/db/cookbook/delete-cookbook-repository'
import { UpdateCookbookRepository } from '../../../../data/protocols/db/cookbook/update-cookbook-repository'
import { AddCookbookModel } from '../../../../domain/usecases/add-cookbook'
import { UpdateCookbookModel } from '../../../../domain/usecases/update-cookbook'

export class CookbookMySqlRepository implements LoadRecipeCookbookRepository, AddCookbookRepository, DeleteCookbookRepository, UpdateCookbookRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async addCookbook (cookbook: AddCookbookModel): Promise<RecipeCookbookModel> {
    const result = await insertOne(this.connectionPool, 'cookbookRecipe', cookbook)
    return { ...cookbook, id: result.insertId }
  }

  async loadRecipeCookbook (idCompany: number | null): Promise<RecipeCookbookModel[]> {
    const result = await getOne(this.connectionPool, 'cookbookRecipe', 'companyId', idCompany)
    return result
  }

  async updateCookbook (id: number, cookbook: UpdateCookbookModel): Promise<boolean> {
    const setFields = Object.entries(cookbook)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')
    const result = await updateAll(this.connectionPool, 'cookbookRecipe', setFields, id)
    if (result.affectedRows === 0) return false
    return true
  }

  async deleteCookbook (id: number): Promise<boolean> {
    const result = await deleteById(this.connectionPool, 'cookbookRecipe', 'id', id)
    if (result.affectedRows === 0) return false
    return true
  }
}
