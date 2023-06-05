import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { Pool } from 'mysql'
import { LoadUserByToken } from '../../../../domain/usecases/load-user-by-token'
import { DbLoadAccountByToken } from '../../../../data/usecases/load-user-by-token/db-load-user-by-token'
import env from '../../../config/env'
import { JwtAdapter } from '../../../../infra/cryptography/jwt-adapter/jwt-adapter'

export const makeLoadAccountByToken = (pool: Pool): LoadUserByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const loadAccountByTokenRepository = new UserMySqlRepository(pool)
  return new DbLoadAccountByToken(jwtAdapter, loadAccountByTokenRepository)
}
