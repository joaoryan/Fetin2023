import { MenuMySqlRepository } from '../../../../infra/db/mysql/menu/menu-mysql-repository'
import { Pool } from 'mysql'
import { LoadMenuById } from '../../../../domain/usecases/load-menu-by-id'
import { DbLoadMenu } from '../../../../data/usecases/load-menu-by-id/db-load-menu'

export const makeLoadMenuById = (pool: Pool): LoadMenuById => {
  const loadMenu = new MenuMySqlRepository(pool)
  return new DbLoadMenu(loadMenu)
}
