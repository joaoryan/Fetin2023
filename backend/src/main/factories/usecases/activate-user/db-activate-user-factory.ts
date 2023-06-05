import { Pool } from 'mysql'
import { DbUpdateUserByActivation } from '../../../../data/usecases/update-user/db-update-user-by-activation'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'

export const makeDbActivateUser = (pool: Pool): DbUpdateUserByActivation => {
  const loadUserByActivationRepository = new UserMySqlRepository(pool)
  const UpdateActivateTokenRepository = new UserMySqlRepository(pool)
  return new DbUpdateUserByActivation(loadUserByActivationRepository, UpdateActivateTokenRepository)
}
