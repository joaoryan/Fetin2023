import { Pool } from 'mysql'
import { LoadPermissionTypesRepository } from '../../../../data/protocols/db/permissionTypes/load-permissionTypes-repository'
import { PermissionTypesModel } from '../../../../domain/models/permissionTypes'
import { getOne } from '../mysql-helper'

export class PermissionTypesMySqlRepository implements LoadPermissionTypesRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async loadById (id: number): Promise<PermissionTypesModel> {
    const result = await getOne(this.connectionPool, 'permissionType', 'id', id)
    return result[0]
  }
}
