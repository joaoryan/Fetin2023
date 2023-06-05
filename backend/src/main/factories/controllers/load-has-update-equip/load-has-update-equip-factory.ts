import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadHasUpdateEquipController } from '../../../../presentation/controller/load-has-update-equip/load-has-update-equip-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadEquipById } from '../../usecases/load-equip-by-id/db-load-equip-by-id'
import { makeLoadHasUpdateEquipValidation } from './load-has-update-equip-validation-factory'

export const makeLoadHasUpdateEquipController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadHasUpdateEquipController = new LoadHasUpdateEquipController(makeDbLoadEquipById(pool), makeLoadHasUpdateEquipValidation())
  return new LogControllerDecorator(loadHasUpdateEquipController, logMysqlRepository)
}
