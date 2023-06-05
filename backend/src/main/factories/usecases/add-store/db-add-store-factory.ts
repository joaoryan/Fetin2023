import { Pool } from 'mysql'
import { DbAddStore } from '../../../../data/usecases/add-store/db-add-store'
import { AddStore } from '../../../../domain/usecases/add-store'
import { StoreMySqlRepository } from '../../../../infra/db/mysql/store/store-mysql-repository'

export const makeDbAddStore = (pool: Pool): AddStore => {
  const storeMySqlRepository = new StoreMySqlRepository(pool)
  return new DbAddStore(storeMySqlRepository)
}
