import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LoadUserByEmailController } from '../../../../presentation/controller/load-userOld-by-email/load-userOld-by-email-controller'
import { makeDbLoadUserOld } from '../../usecases/load-userOld-by-email/db-load-userOld-by-email-factory'

export const makeLoadUserByEmailDataController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadUserDataController = new LoadUserByEmailController(makeDbLoadUserOld(pool))

  return new LogControllerDecorator(loadUserDataController, logMysqlRepository)
}
