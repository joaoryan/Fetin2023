import { Pool } from 'mysql'
import { AddCompanyRepository } from '../../../../data/protocols/db/company/add-company-repository'
import { LoadCompanyByCorporateNameRepository } from '../../../../data/usecases/add-company/db-add-company-protocols'
import { CompanyModel } from '../../../../domain/models/company'
import { AddCompanyModel } from '../../../../domain/usecases/add-company'
import { getOne, insertOne } from '../mysql-helper'
import { mapCreatedCompany } from './company-mysql-repository-helper'
import { LoadCompanyByIdRepository } from '../../../../data/protocols/db/company/load-company-by-id-repository'

export class CompanyMySqlRepository implements AddCompanyRepository, LoadCompanyByCorporateNameRepository, LoadCompanyByIdRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async add (companyData: AddCompanyModel): Promise<CompanyModel> {
    const result = await insertOne(this.connectionPool, 'company', companyData)
    return mapCreatedCompany(companyData, result.insertId)
  }

  async loadByCorporateName (corporateName: string): Promise<CompanyModel> {
    const result = await getOne(this.connectionPool, 'company', 'corporateName', corporateName)
    return result[0]
  }

  async loadById (id: number): Promise<CompanyModel> {
    const result = await getOne(this.connectionPool, 'company', 'id', id)
    return result[0]
  }
}
