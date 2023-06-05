import { Pool } from 'mysql'
import { LoadConfigsByUserId } from '../../../../domain/usecases/load-configs-by-user-id'
import { DbLoadConfigsByUserId } from '../../../../data/usecases/load-configs-by-user-id/db-load-configs-by-user-id'
import { ConfigsMySqlRepository } from '../../../../infra/db/mysql/configs/configs-mysql-repository'

export const makeDbLoadConfigsByUserId = (pool: Pool): LoadConfigsByUserId => {
  const configsMysqlRepository = new ConfigsMySqlRepository(pool)
  return new DbLoadConfigsByUserId(configsMysqlRepository)
}
