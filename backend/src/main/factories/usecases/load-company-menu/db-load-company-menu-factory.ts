import { MenuMySqlRepository } from '../../../../infra/db/mysql/menu/menu-mysql-repository'
import { Pool } from 'mysql'
import { LoadCompanyMenu } from '../../../../domain/usecases/load-company-menu'
import { DbLoadCompanyMenu } from '../../../../data/usecases/load-company-menu/db-load-company-menu'

export const makeLoadCompanyMenu = (pool: Pool): LoadCompanyMenu => {
  const loadMenu = new MenuMySqlRepository(pool)
  return new DbLoadCompanyMenu(loadMenu)
}
