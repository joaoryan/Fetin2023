import { DbAddUser } from '../../../../data/usecases/add-user/db-add-user'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { Pool } from 'mysql'
import { AddUser } from '../../../../domain/usecases/add-user'
import { CodeRandom } from '../../../../utils/factors/creat-randomString-factor'

export const makeDbAddUser = (pool: Pool): AddUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMySqlRepository = new UserMySqlRepository(pool)
  const codeRandom = new CodeRandom()
  return new DbAddUser(bcryptAdapter, userMySqlRepository, userMySqlRepository, codeRandom)
}
