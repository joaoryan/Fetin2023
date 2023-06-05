import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { CountEquipmentController } from '../../../../presentation/controller/count-equipment/count-equipment-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbCountEquipment } from '../../usecases/count-equipment/db-count-equipment-factory'
import { makeCountEquipmentValidation } from './count-equipment-validation-factory'

export const makeCountEquipmentController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const controller = new CountEquipmentController(makeCountEquipmentValidation(), makeDbCountEquipment(pool))
  return new LogControllerDecorator(controller, logMysqlRepository)
}
