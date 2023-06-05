import { AddMenuController } from '../../../../presentation/controller/add-menu/add-menu-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeAddMenuValidation } from './add-menu-validation-factory'
import { makeAddMenuConfigsValidation } from './add-menu-configs-validation-factory'
import { makeDbAddMenu } from '../../usecases/add-menu/db-add-menu-factory'
import { makeDbAddMenuConfigs } from '../../usecases/add-menu-configs/db-add-menu-configs-factory'

export const makeAddMenuController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addMenuController = new AddMenuController(makeAddMenuValidation(), makeAddMenuConfigsValidation(), makeDbAddMenu(pool), makeDbAddMenuConfigs(pool))

  return new LogControllerDecorator(addMenuController, logMysqlRepository)
}
