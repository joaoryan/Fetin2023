import { Pool } from 'mysql'
import { DbUpdateMenu } from '../../../../data/usecases/update-menu/db-update-menu'
import { UpdateMenu } from '../../../../domain/usecases/update-menu'
import { MenuMySqlRepository } from '../../../../infra/db/mysql/menu/menu-mysql-repository'

export const makeDbUpdateMenu = (pool: Pool): UpdateMenu => {
  const menuMySqlRepository = new MenuMySqlRepository(pool)
  return new DbUpdateMenu(menuMySqlRepository)
}
