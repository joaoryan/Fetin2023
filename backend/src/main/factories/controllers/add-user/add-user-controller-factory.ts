import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeAddUserValidation } from './add-user-validation-factory'
import { makeDbAddUser } from '../../usecases/add-user/db-add-user-factory'
import { MailService } from '../../../../utils/send-email-adapter'
import { makeDbAddConfigs } from '../../usecases/add-configs-factory/db-add-configs-factory'
import { AddUserController } from '../../../../presentation/controller/add-user/add-user-controller'
import { makeDbAddUserBelongStore } from '../../usecases/add-user-belong-store/db-add-user-belong-store-factory'

export const makeAddUserController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addUserController = new AddUserController(makeDbAddUser(pool), makeDbAddConfigs(pool), makeAddUserValidation(), new MailService(), makeDbAddUserBelongStore(pool))
  return new LogControllerDecorator(addUserController, logMysqlRepository)
}
