import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadStoresByCompanyIdController } from '../../../../presentation/controller/load-store-by-company-id/load-store-by-company-id-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadStoreByCompanyId } from '../../usecases/load-store-by-company-id/db-load-store-by-company-id-factory'
import { makeLoadStoresByCompanyIdValidation } from './load-stores-by-company-id-validation-factory'

export const makeLoadStoresByCompanyIdController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadStoresByCompanyIdController = new LoadStoresByCompanyIdController(makeDbLoadStoreByCompanyId(pool), makeLoadStoresByCompanyIdValidation())
  return new LogControllerDecorator(loadStoresByCompanyIdController, logMysqlRepository)
}
