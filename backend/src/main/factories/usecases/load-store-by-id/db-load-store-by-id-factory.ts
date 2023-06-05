import { Pool } from 'mysql'
import { LoadStoreById } from '../../../../domain/usecases/load-store-by-id'
import { DbLoadStoreById } from '../../../../data/usecases/load-store-by-id/db-load-store-by-id'
import { StoreMySqlRepository } from '../../../../infra/db/mysql/store/store-mysql-repository'

export const makeDbLoadStoreById = (pool: Pool): LoadStoreById => {
  const storeMySqlRepository = new StoreMySqlRepository(pool)
  return new DbLoadStoreById(storeMySqlRepository)
}
