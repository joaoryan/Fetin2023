import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { Pool } from 'mysql'
import env from '../../../config/env'
import { Authentication } from '../../../../domain/usecases/authentication'

export const makeDbAutehntication = (pool: Pool): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMySqlRepository = new UserMySqlRepository(pool)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(userMySqlRepository, bcryptAdapter, jwtAdapter, userMySqlRepository)
}
