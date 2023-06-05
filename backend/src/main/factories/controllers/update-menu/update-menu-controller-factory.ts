import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeUpdateMenuConfigsValidation } from './Update-menu-configs-validation-factory'
import { makeUpdateMenuValidation } from './Update-menu-validation-factory'
import { UpdateMenuController } from '../../../../presentation/controller/update-menu/update-menu-controller'
import { makeDbUpdateMenu } from '../../usecases/update-menu/db-update-menu-factory'
import { makeDbUpdateMenuConfigs } from '../../usecases/update-menu-configs/db-Update-menu-factory'

export const makeUpdateMenuController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateMenuController = new UpdateMenuController(makeUpdateMenuValidation(), makeUpdateMenuConfigsValidation(), makeDbUpdateMenu(pool), makeDbUpdateMenuConfigs(pool))

  return new LogControllerDecorator(updateMenuController, logMysqlRepository)
}
