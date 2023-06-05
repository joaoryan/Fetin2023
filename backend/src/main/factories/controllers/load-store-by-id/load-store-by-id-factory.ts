import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadStoreByIdController } from '../../../../presentation/controller/load-store-by-id/load-store-by-id-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadStoreById } from '../../usecases/load-store-by-id/db-load-store-by-id-factory'
import { makeLoadStoreByIdValidation } from './load-store-by-id-validation-factory'

export const makeLoadStoreByIdController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadEquipByIdController = new LoadStoreByIdController(makeDbLoadStoreById(pool), makeLoadStoreByIdValidation())
  return new LogControllerDecorator(loadEquipByIdController, logMysqlRepository)
}
