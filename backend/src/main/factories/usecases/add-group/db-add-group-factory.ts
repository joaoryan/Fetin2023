import { Pool } from 'mysql'
import { DbAddGroup } from '../../../../data/usecases/add-group/db-add-group'
import { AddGroup } from '../../../../domain/usecases/add-group'
import { GroupMySqlRepository } from '../../../../infra/db/mysql/group/group-mysql-repository'

export const makeDbAddGroup = (pool: Pool): AddGroup => {
  const groupySqlRepository = new GroupMySqlRepository(pool)
  return new DbAddGroup(groupySqlRepository)
}
