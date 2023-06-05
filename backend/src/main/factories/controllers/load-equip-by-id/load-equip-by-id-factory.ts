import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadEquipByIdController } from '../../../../presentation/controller/load-equip-by-id/load-equip-by-id-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadEquipById } from '../../usecases/load-equip-by-id/db-load-equip-by-id'
import { makeLoadEquipByIdValidation } from './load-equip-by-id-validation-factory'

export const makeLoadEquipByIdController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadEquipByIdController = new LoadEquipByIdController(makeDbLoadEquipById(pool), makeLoadEquipByIdValidation())
  return new LogControllerDecorator(loadEquipByIdController, logMysqlRepository)
}
