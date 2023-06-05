import { Pool } from 'mysql'
import { LoadPermissionTypes } from '../../../../domain/usecases/load-permissionTypes'
import { PermissionTypesMySqlRepository } from '../../../../infra/db/mysql/permissionTypes/permissionTypes-mysql-repository'
import { DbLoadPermissionTypes } from '../../../../data/usecases/load-permissionTypes/db-load-permissionTypes'

export const makeDbLoadPermissionTypes = (pool: Pool): LoadPermissionTypes => {
  const permissionTypesMySqlRepository = new PermissionTypesMySqlRepository(pool)
  return new DbLoadPermissionTypes(permissionTypesMySqlRepository)
}
