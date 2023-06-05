import { DbLoadUserById } from '../../../../data/usecases/load-user-by-id/db-load-user-by-id'
import { LoadUserById } from '../../../../domain/usecases/load-user-by-id'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { Pool } from 'mysql'

export const makeDbLoadUser = (pool: Pool): LoadUserById => {
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbLoadUserById(userMySqlRepository)
}
