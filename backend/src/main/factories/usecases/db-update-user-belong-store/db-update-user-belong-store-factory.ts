import { Pool } from 'mysql'
import { DbUpdateUserBelongStore } from '../../../../data/usecases/update-user-belong-store/db-update-user-belong-store'
import { EditUserBelongStoreData } from '../../../../domain/usecases/update-user-belong-store-data'
import { StoreMySqlRepository } from '../../../../infra/db/mysql/store/store-mysql-repository'
import { UserMySqlRepository } from '../../../../infra/db/mysql/user/user-mysql-repository'

export const makeDbEditUserBelongStore = (pool: Pool): EditUserBelongStoreData => {
  const storeMySqlRepository = new StoreMySqlRepository(pool)
  const userMySqlRepository = new UserMySqlRepository(pool)
  return new DbUpdateUserBelongStore(storeMySqlRepository, userMySqlRepository, userMySqlRepository)
}
