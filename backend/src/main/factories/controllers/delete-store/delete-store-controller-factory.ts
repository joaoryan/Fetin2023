import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDeleteStoreValidation } from './delete-store-validation-factory'
import { DeleteStoreController } from '../../../../presentation/controller/delete-store/delete-store-controller'
import { makeDbDeleteStore } from '../../usecases/delete-store/db-delete-store-factory'

export const makeDeleteStoreController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const storeController = new DeleteStoreController(makeDeleteStoreValidation(), makeDbDeleteStore(pool))

  return new LogControllerDecorator(storeController, logMysqlRepository)
}
