import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { Pool } from 'mysql'
import { LoadUserByCorporateName } from '../../../../domain/usecases/load-user-by-corporateName'
import { DbLoadUserByCorporateName } from '../../../../data/usecases/load-user-by-corporateName/db-load-user-by-corporateName'

export const makeDbLoadUser = (pool: Pool): LoadUserByCorporateName => {
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbLoadUserByCorporateName(userMySqlRepository)
}
