import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { Pool } from 'mysql'
import { LoadUserOldByEmail } from '../../../../domain/usecases/load-userOld-by-email'
import { DbLoadUserOldByEmail } from '../../../../data/usecases/load-userOld-by-email/db-load-userOld-by-email'

export const makeDbLoadUserOld = (pool: Pool): LoadUserOldByEmail => {
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbLoadUserOldByEmail(userMySqlRepository)
}
