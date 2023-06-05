import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { DeleteEquipmentController } from '../../../../presentation/controller/delete-equipment/delete-equipment-controller'
import { makeDeleteEquipmentValidation } from './delete-equipment-validation-factory'
import { makeDbDeleteEquipment } from '../../usecases/delete-equipment/db-delete-equipment-factory'

export const makeDeleteEquipmentController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const deleteEquipmentController = new DeleteEquipmentController(makeDeleteEquipmentValidation(), makeDbDeleteEquipment(pool))

  return new LogControllerDecorator(deleteEquipmentController, logMysqlRepository)
}
