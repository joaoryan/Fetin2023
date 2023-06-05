import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LoadUserByCorporateNameController } from '../../../../presentation/controller/load-user-by-corporateName/load-user-by-corporateName-controller'
import { makeDbLoadUser } from '../../usecases/load-user-by-corporateName/db-load-user-by-corporateName-factory'

export const makeLoadUserByCorporateNameDataController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadUserDataController = new LoadUserByCorporateNameController(makeDbLoadUser(pool))

  return new LogControllerDecorator(loadUserDataController, logMysqlRepository)
}
