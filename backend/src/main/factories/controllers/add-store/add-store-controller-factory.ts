import { Pool } from 'mysql'
import { AddStoreController } from '../../../../presentation/controller/add-store/add-store-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDbAddStore } from '../../usecases/add-store/db-add-store-factory'
import { makeAddStoreValidation } from './add-store-validation-factory'

export const makeAddStoreController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addStoreController = new AddStoreController(makeAddStoreValidation(), makeDbAddStore(pool))

  return new LogControllerDecorator(addStoreController, logMysqlRepository)
}
