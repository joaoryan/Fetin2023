import { Pool } from 'mysql'
import { DbUpdateConfigs } from '../../../../data/usecases/update-configs/db-update-configs'
import { UpdateConfigs } from '../../../../domain/usecases/update-configs'
import { ConfigsMySqlRepository } from '../../../../infra/db/mysql/configs/configs-mysql-repository'

export const makeDbUpdateConfigs = (pool: Pool): UpdateConfigs => {
  const configsMySqlRepository = new ConfigsMySqlRepository(pool)
  return new DbUpdateConfigs(configsMySqlRepository, configsMySqlRepository)
}
