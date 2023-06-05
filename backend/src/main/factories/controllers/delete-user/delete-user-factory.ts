import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDeleteUserValidation } from './delete-user-validation-factory'
import { DeleteUserController } from '../../../../presentation/controller/delete-user/delete-user-controller'
import { makeDeleteUser } from '../../usecases/delete-user/db-delete-user-factory'

export const makeDeleteUserController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const deleteUserController = new DeleteUserController(makeDeleteUserValidation(), makeDeleteUser(pool))
  return new LogControllerDecorator(deleteUserController, logMysqlRepository)
}
