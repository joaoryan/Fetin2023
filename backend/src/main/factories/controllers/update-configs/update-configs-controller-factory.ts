import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { UpdateConfigsController } from '../../../../presentation/controller/update-configs/update-configs-controller'
import { makeDbUpdateConfigs } from '../../usecases/update-configs/db-update-configs-factory'
import { makeUpdateConfigsValidation } from './update-configs-validation-factory'

export const makeUpdateConfigsController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateConfigsController = new UpdateConfigsController(makeUpdateConfigsValidation(), makeDbUpdateConfigs(pool))

  return new LogControllerDecorator(updateConfigsController, logMysqlRepository)
}
