import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'
import { Pool } from 'mysql'
import { DbAddUserBelongStore } from '../../../../data/usecases/add-UserBelongStore/db-add-UserBelongStore'
import { AddUserBelongStore } from '../../../../domain/usecases/add-userBelongStore'

export const makeDbAddUserBelongStore = (pool: Pool): AddUserBelongStore => {
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbAddUserBelongStore(userMySqlRepository)
}
