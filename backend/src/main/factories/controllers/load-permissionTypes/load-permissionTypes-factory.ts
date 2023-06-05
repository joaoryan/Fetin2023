import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoadPermissionTypesValidation } from './load-permissionTypes-validation-factory'
import { makeDbLoadPermissionTypes } from '../../usecases/load-permissionTypes/db-load-permissionTypes-factory'
import { LoadPermissionTypesController } from '../../../../presentation/controller/load-permissionTypes/load-permissionTypes.controller'

export const makeLoadPermissionTypesController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadPermissionTypesController = new LoadPermissionTypesController(makeDbLoadPermissionTypes(pool), makeLoadPermissionTypesValidation())
  return new LogControllerDecorator(loadPermissionTypesController, logMysqlRepository)
}
