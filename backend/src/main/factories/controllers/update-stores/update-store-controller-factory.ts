import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { makeUpdateStoreBodyValidation } from './update-store-body-validation-factory'
import { makeUpdateStoreParamsValidation } from './update-store-params-validation-factory'
import { makeDbUpdateStore } from '../../usecases/update-store/db-update-store-factory'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { UpdateStoreController } from '../../../../presentation/controller/update-store/update-store-controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeUpdateStoreController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateStoreController = new UpdateStoreController(makeUpdateStoreBodyValidation(), makeUpdateStoreParamsValidation(), makeDbUpdateStore(pool))

  return new LogControllerDecorator(updateStoreController, logMysqlRepository)
}
