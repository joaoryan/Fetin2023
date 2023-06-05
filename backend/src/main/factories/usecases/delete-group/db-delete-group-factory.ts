import { Pool } from 'mysql'
import { DbDeleteGroup } from '../../../../data/usecases/delete-group/db-delete-group'
import { DeleteGroup } from '../../../../domain/usecases/delete-group'
import { GroupMySqlRepository } from '../../../../infra/db/mysql/group/group-mysql-repository'

export const makeDbDeleteGroup = (pool: Pool): DeleteGroup => {
  const groupySqlRepository = new GroupMySqlRepository(pool)
  return new DbDeleteGroup(groupySqlRepository)
}
