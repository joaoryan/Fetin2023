import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { ActivateUserController } from '../../../../presentation/controller/activate-user/activate-user-controller'
import { makeDbActivateUser } from '../../usecases/activate-user/db-activate-user-factory'
import { makeActivateUserValidation } from './activate-user-validation-factory'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeActivateUserController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const activateUserController = new ActivateUserController(makeActivateUserValidation(), makeDbActivateUser(pool))
  return new LogControllerDecorator(activateUserController, logMysqlRepository)
}
