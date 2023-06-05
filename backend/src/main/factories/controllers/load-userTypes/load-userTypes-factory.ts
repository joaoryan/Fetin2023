import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoadUserTypesValidation } from './load-userTypes-validation-factory'
import { makeDbLoadUserTypes } from '../../usecases/load-userTypes/db-load-userTypes-factory'
import { LoadUserTypesController } from '../../../../presentation/controller/load-userTypes/load-userTypes.controller'

export const makeLoadUserTypesController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadUserTypesController = new LoadUserTypesController(makeDbLoadUserTypes(pool), makeLoadUserTypesValidation())
  return new LogControllerDecorator(loadUserTypesController, logMysqlRepository)
}
