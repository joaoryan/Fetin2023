import { Pool } from 'mysql'
import { LoadCompanyTypesRepository } from '../../../../data/protocols/db/companyTypes/load-companyTypes-repository'
import { CompanyTypesModel } from '../../../../domain/models/companyTypes'
import { customGet } from '../mysql-helper'

export class CompanyTypesMySqlRepository implements LoadCompanyTypesRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async load (): Promise<CompanyTypesModel[]> {
    return await customGet(this.connectionPool, 'SELECT * FROM companyType')
  }
}
