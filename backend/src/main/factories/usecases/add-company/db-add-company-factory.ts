import { Pool } from 'mysql'
import { DbAddCompany } from '../../../../data/usecases/add-company/db-add-company'
import { AddCompany } from '../../../../domain/usecases/add-company'
import { CompanyMySqlRepository } from '../../../../infra/db/mysql/company/company-mysql-repository'

export const makeDbAddCompany = (pool: Pool): AddCompany => {
  const companyMySqlRepository = new CompanyMySqlRepository(pool)
  return new DbAddCompany(companyMySqlRepository, companyMySqlRepository)
}
