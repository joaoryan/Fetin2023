import { Pool } from 'mysql'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { DbLoadUserByCompany } from '../../../../data/usecases/load-user-by-company/db-load-user-by-company'
import { LoadUserByCompany } from '../../../../domain/usecases/load-user-by-company'
import { StoreMySqlRepository } from '../../../../infra/db/mysql/store/store-mysql-repository'

export const makeDbLoadUserByCompany = (pool: Pool): LoadUserByCompany => {
  const userMySqlRepository = new UserMySqlRepository(pool)
  const storeMySqlRepository = new StoreMySqlRepository(pool)
  return new DbLoadUserByCompany(userMySqlRepository, storeMySqlRepository)
}
