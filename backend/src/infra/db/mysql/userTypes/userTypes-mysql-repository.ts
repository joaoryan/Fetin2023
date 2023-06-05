import { Pool } from 'mysql'
import { LoadUserTypesRepository } from '../../../../data/protocols/db/userTypes/load-userTypes-repository'
import { UserTypesModel } from '../../../../domain/models/userTypes'
import { getOne } from '../mysql-helper'

export class UserTypesMySqlRepository implements LoadUserTypesRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async loadByCompanyTypeId (companyTypeId: number): Promise<UserTypesModel[]> {
    const result = await getOne(this.connectionPool, 'userType', 'companyTypeId', companyTypeId)
    for (let i = 0; i < result.length; i++) {
      Object.assign(result[i])
    }
    return result
  }
}
