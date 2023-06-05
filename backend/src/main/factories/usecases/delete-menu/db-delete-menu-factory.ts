import { Pool } from 'mysql'
import { DbDeleteMenu } from '../../../../data/usecases/delete-menu/db-delete-menu'
import { DeleteMenu } from '../../../../domain/usecases/delete-menu'
import { MenuMySqlRepository } from '../../../../infra/db/mysql/menu/menu-mysql-repository'

export const makeDbDeleteMenu = (pool: Pool): DeleteMenu => {
  const menuMySqlRepository = new MenuMySqlRepository(pool)

  return new DbDeleteMenu(menuMySqlRepository)
}
