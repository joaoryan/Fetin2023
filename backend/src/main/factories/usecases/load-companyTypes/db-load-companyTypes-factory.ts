import { Pool } from 'mysql'
import { LoadCompanyTypes } from '../../../../domain/usecases/load-companyTypes'
import { CompanyTypesMySqlRepository } from '../../../../infra/db/mysql/companyTypes/companyTypes-mysql-repository'
import { DbLoadCompanyTypes } from '../../../../data/usecases/load-companyTypes/db-load-companyTypes'

export const makeDbLoadCompanyTypes = (pool: Pool): LoadCompanyTypes => {
  const companyTypesMySqlRepository = new CompanyTypesMySqlRepository(pool)
  return new DbLoadCompanyTypes(companyTypesMySqlRepository)
}
