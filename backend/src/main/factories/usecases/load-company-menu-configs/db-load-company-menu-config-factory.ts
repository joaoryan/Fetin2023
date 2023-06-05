import { MenuMySqlRepository } from '../../../../infra/db/mysql/menu/menu-mysql-repository'
import { Pool } from 'mysql'
import { LoadCompanyMenuConfigs } from '../../../../domain/usecases/load-company-menu-configs'
import { DbLoadCompanyMenuConfigs } from '../../../../data/usecases/load-menu-configs/db-load-menu-configs'

export const makeLoadCompanyMenuConfigs = (pool: Pool): LoadCompanyMenuConfigs => {
  const loadMenuConfig = new MenuMySqlRepository(pool)
  return new DbLoadCompanyMenuConfigs(loadMenuConfig)
}
