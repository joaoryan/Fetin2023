import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeDeleteMenuValidation } from './delete-menu-validation-factory'
import { makeDbDeleteMenu } from '../../usecases/delete-menu/db-delete-menu-factory'
import { DeleteMenuController } from '../../../../presentation/controller/delete-menu/delete-menu-controller'

export const makeDeleteMenuController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const deleteMenuController = new DeleteMenuController(makeDeleteMenuValidation(), makeDbDeleteMenu(pool))

  return new LogControllerDecorator(deleteMenuController, logMysqlRepository)
}
