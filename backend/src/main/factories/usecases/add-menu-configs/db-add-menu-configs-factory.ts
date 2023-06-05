import { Pool } from 'mysql'
import { DbAddMenuConfigs } from '../../../../data/usecases/add-menu-configs/db-menu-configs'
import { AddMenuConfigs } from '../../../../domain/usecases/add-menu-configs'
import { MenuMySqlRepository } from '../../../../infra/db/mysql/menu/menu-mysql-repository'

export const makeDbAddMenuConfigs = (pool: Pool): AddMenuConfigs => {
  const menuMySqlRepository = new MenuMySqlRepository(pool)
  return new DbAddMenuConfigs(menuMySqlRepository)
}
