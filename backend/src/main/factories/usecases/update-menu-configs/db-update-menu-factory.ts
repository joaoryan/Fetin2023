import { Pool } from 'mysql'
import { DbUpdateMenuConfigs } from '../../../../data/usecases/update-menu-configs/db-update-menu-cofigs'
import { UpdateMenuConfigs } from '../../../../domain/usecases/update-menu-configs'
import { MenuMySqlRepository } from '../../../../infra/db/mysql/menu/menu-mysql-repository'

export const makeDbUpdateMenuConfigs = (pool: Pool): UpdateMenuConfigs => {
  const menuMySqlRepository = new MenuMySqlRepository(pool)
  return new DbUpdateMenuConfigs(menuMySqlRepository)
}
