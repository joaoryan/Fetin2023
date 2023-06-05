import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeDbEditUserData } from '../../usecases/db-update-user-data/db-update-user-data-factory'
import { makeEditUserDataValidation } from './update-user-data-validation-factory'
import { EditUserController } from '../../../../presentation/controller/update-user/update-user-controller'
import { makeDbEditUserBelongStore } from '../../usecases/db-update-user-belong-store/db-update-user-belong-store-factory'

export const makeEditUserByAdmController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const editUserDataController = new EditUserController(makeEditUserDataValidation(), makeDbEditUserData(pool), makeDbEditUserBelongStore(pool))
  return new LogControllerDecorator(editUserDataController, logMysqlRepository)
}
