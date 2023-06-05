import { Pool } from 'mysql'
import { DbDeleteStore } from '../../../../data/usecases/delete-store/db-delete-store'
import { DeleteStore } from '../../../../domain/usecases/delete-store'
import { StoreMySqlRepository } from '../../../../infra/db/mysql/store/store-mysql-repository'

export const makeDbDeleteStore = (pool: Pool): DeleteStore => {
  const storeMySqlRepository = new StoreMySqlRepository(pool)
  return new DbDeleteStore(storeMySqlRepository, storeMySqlRepository)
}
