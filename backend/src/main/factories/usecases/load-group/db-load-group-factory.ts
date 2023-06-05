import { GroupMySqlRepository } from '../../../../infra/db/mysql/group/group-mysql-repository'
import { Pool } from 'mysql'
import { DbLoadMenuGroup } from '../../../../data/usecases/load-menu-group/db-load-menu-group'
import { LoadMenuGroup } from '../../../../domain/usecases/load-menu-group'

export const makeLoadGroup = (pool: Pool): LoadMenuGroup => {
  const loadMenu = new GroupMySqlRepository(pool)
  return new DbLoadMenuGroup(loadMenu)
}
