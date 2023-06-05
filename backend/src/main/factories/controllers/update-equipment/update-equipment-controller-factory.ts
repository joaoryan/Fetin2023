import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { makeUpdateEquipmentBodyValidation } from './update-equipment-body-validation-factory'
import { makeUpdateEquipmentParamsValidation } from './update-equipment-params-validation-factory'
import { makeDbUpdateEquipment } from '../../usecases/update-equipment/db-update-equipment-factory'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { UpdateEquipmentController } from '../../../../presentation/controller/update-equipment/update-equipment-controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoadEquipByPin } from '../../usecases/load-equip-by-pin/db-load-equip-by-pin-factory'

export const makeUpdateEquipmentController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateEquipmentController = new UpdateEquipmentController(makeUpdateEquipmentParamsValidation(), makeUpdateEquipmentBodyValidation(), makeDbUpdateEquipment(pool), makeLoadEquipByPin(pool))

  return new LogControllerDecorator(updateEquipmentController, logMysqlRepository)
}
