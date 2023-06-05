import { Pool } from 'mysql'
import { DbDeleteUser } from '../../../../data/usecases/delete-user/db-delete-user'
import { DeleteUser } from '../../../../domain/usecases/delete-user'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'

export const makeDeleteUser = (pool: Pool): DeleteUser => {
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbDeleteUser(userMySqlRepository)
}
