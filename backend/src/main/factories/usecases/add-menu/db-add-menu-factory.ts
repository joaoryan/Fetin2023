import { Pool } from 'mysql'
import { DbAddMenu } from '../../../../data/usecases/add-menu/db-add-menu'
import { AddMenu } from '../../../../domain/usecases/add-menu'
import { MenuMySqlRepository } from '../../../../infra/db/mysql/menu/menu-mysql-repository'

export const makeDbAddMenu = (pool: Pool): AddMenu => {
  const menuMySqlRepository = new MenuMySqlRepository(pool)
  return new DbAddMenu(menuMySqlRepository)
}
