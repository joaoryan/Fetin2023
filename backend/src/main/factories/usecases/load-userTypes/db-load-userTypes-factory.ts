import { Pool } from 'mysql'
import { LoadUserTypes } from '../../../../domain/usecases/load-userTypes'
import { UserTypesMySqlRepository } from '../../../../infra/db/mysql/userTypes/userTypes-mysql-repository'
import { DbLoadUserTypes } from '../../../../data/usecases/load-userTypes/db-load-userTypes'

export const makeDbLoadUserTypes = (pool: Pool): LoadUserTypes => {
  const userTypesMySqlRepository = new UserTypesMySqlRepository(pool)
  return new DbLoadUserTypes(userTypesMySqlRepository)
}
