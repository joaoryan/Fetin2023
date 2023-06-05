import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { makeAddEquipmentValidation } from './add-equipment-validation-factory'
import { makeDbAddEquipment } from '../../usecases/add-equipment/db-add-equipment-factory'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { AddEquipmentController } from '../../../../presentation/controller/add-equipment/add-equipment-controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeAddEquipmentController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addEquipmentController = new AddEquipmentController(makeAddEquipmentValidation(), makeDbAddEquipment(pool))

  return new LogControllerDecorator(addEquipmentController, logMysqlRepository)
}
