import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { Pool } from 'mysql'
import { DbAuthenticationPassword } from '../../../../data/usecases/authenticationPassword/db-authentication'
import { AuthenticationPassword } from '../../../../domain/usecases/authenticationPassword'

export const makeDbauthenticationPassword = (pool: Pool): AuthenticationPassword => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbAuthenticationPassword(userMySqlRepository, bcryptAdapter)
}
