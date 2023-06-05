import { Pool } from 'mysql'
import { DbUpdateStore } from '../../../../data/usecases/update-store/db-update-store'
import { UpdateStore } from '../../../../domain/usecases/update-store'
import { StoreMySqlRepository } from '../../../../infra/db/mysql/store/store-mysql-repository'

export const makeDbUpdateStore = (pool: Pool): UpdateStore => {
  const storeMySqlRepository = new StoreMySqlRepository(pool)
  return new DbUpdateStore(storeMySqlRepository, storeMySqlRepository)
}
