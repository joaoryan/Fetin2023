import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { EditUserDataController } from '../../../../presentation/controller/update-user-data/update-user-data-controller'
import { makeDbEditUserData } from '../../usecases/db-update-user-data/db-update-user-data-factory'
import { makeEditUserDataValidation } from './update-user-data-validation-factory'

export const makeEditUserDataController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const editUserDataController = new EditUserDataController(makeEditUserDataValidation(), makeDbEditUserData(pool))

  return new LogControllerDecorator(editUserDataController, logMysqlRepository)
}
