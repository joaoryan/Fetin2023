import { Pool } from 'mysql'
import { DbUpdateGroup } from '../../../../data/usecases/update-group/db-update-group'
import { UpdateGroup } from '../../../../domain/usecases/update-group'
import { GroupMySqlRepository } from '../../../../infra/db/mysql/group/group-mysql-repository'

export const makeDbUpdateGroup = (pool: Pool): UpdateGroup => {
  const groupySqlRepository = new GroupMySqlRepository(pool)
  return new DbUpdateGroup(groupySqlRepository)
}
