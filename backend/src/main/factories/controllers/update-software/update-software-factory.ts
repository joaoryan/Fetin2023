import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { UpdateSoftwareController } from '../../../../presentation/controller/update-software/update-software-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoadEquipByPin } from '../../usecases/load-equip-by-pin/db-load-equip-by-pin-factory'
import { makeDbUpdateSoftware } from '../../usecases/update-software/db-update-software'
import { makeUpdateSoftwareValidation } from './update-software-validation-factory'

export const makeUpdateSoftwareController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateSoftwareController = new UpdateSoftwareController(makeDbUpdateSoftware(), makeUpdateSoftwareValidation(), makeLoadEquipByPin(pool))
  return new LogControllerDecorator(updateSoftwareController, logMysqlRepository)
}
