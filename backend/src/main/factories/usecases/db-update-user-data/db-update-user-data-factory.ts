import { Pool } from 'mysql'
import { DbEditUserData } from '../../../../data/usecases/update-user-data/db-update-user-data'
import { EditUserData } from '../../../../domain/usecases/update-user-data'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'

export const makeDbEditUserData = (pool: Pool): EditUserData => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbEditUserData(bcryptAdapter, userMySqlRepository, userMySqlRepository)
}
