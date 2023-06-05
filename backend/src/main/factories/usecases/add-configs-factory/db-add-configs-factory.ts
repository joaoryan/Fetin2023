import { Pool } from 'mysql'
import { DbAddConfigs } from '../../../../data/usecases/add-configs/db-add-configs'
import { AddConfigs } from '../../../../domain/usecases/add-configs'
import { ConfigsMySqlRepository } from '../../../../infra/db/mysql/configs/configs-mysql-repository'

export const makeDbAddConfigs = (pool: Pool): AddConfigs => {
  const configsMySqlRepository = new ConfigsMySqlRepository(pool)
  return new DbAddConfigs(configsMySqlRepository)
}
