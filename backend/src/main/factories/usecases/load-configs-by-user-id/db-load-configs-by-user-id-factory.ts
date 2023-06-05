import { DbLoadCompanyById } from '../../../../data/usecases/load-company-by-id/db-load-company-by-id'
import { Pool } from 'mysql'
import { CompanyMySqlRepository } from '../../../../infra/db/mysql/company/company-mysql-repository'
import { LoadCompanyById } from '../../../../domain/usecases/load-company-by-id'

export const makeDbLoadCompany = (pool: Pool): LoadCompanyById => {
  const companyMySqlRepository = new CompanyMySqlRepository(pool)
  return new DbLoadCompanyById(companyMySqlRepository)
}
