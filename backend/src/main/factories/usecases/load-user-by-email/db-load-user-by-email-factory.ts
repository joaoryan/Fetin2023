import { LoadUserByEmail } from '../../../../domain/usecases/load-user-by-email'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { Pool } from 'mysql'
import { DbLoadUserByEmail } from '../../../../data/usecases/load-user-by-email/db-load-user-by-email'

export const makeDbLoadUser = (pool: Pool): LoadUserByEmail => {
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbLoadUserByEmail(userMySqlRepository)
}
