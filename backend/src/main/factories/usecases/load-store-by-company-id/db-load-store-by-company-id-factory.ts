import { Pool } from 'mysql'
import { LoadStoresByCompanyId } from '../../../../domain/usecases/load-stores-by-company-id'
import { DbLoadStoresByCompanyId } from '../../../../data/usecases/load-store-by-company-id/db-load-store-by-company-id'
import { StoreMySqlRepository } from '../../../../infra/db/mysql/store/store-mysql-repository'

export const makeDbLoadStoreByCompanyId = (pool: Pool): LoadStoresByCompanyId => {
  const storeMySqlRepository = new StoreMySqlRepository(pool)
  return new DbLoadStoresByCompanyId(storeMySqlRepository, storeMySqlRepository)
}
