import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { makeLoadEquipByMenuValidation } from './load-equip-by-menu-validation-factory'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LoadEquipByMenuController } from '../../../../presentation/controller/load-equip-by-menu/load-equip-by-menu-controller'
import { makeDbLoadEquipByMenu } from '../../usecases/load-equip-by-menu/db-load-equip-by-menu'

export const makeLoadEquipByMenuController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadEquipByMenuController = new LoadEquipByMenuController(makeLoadEquipByMenuValidation(), makeDbLoadEquipByMenu(pool))
  return new LogControllerDecorator(loadEquipByMenuController, logMysqlRepository)
}
