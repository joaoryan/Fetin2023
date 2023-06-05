import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { LoadUserDataController } from '../../../../presentation/controller/load-user-data/load-user-data-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadUser } from '../../usecases/load-user-by-id/db-load-user-by-id-factory'
import { makeDbLoadConfigsByUserId } from '../../usecases/load-company-by-id/db-load-company-by-id-factory'
import { makeDbLoadCompany } from '../../usecases/load-configs-by-user-id/db-load-configs-by-user-id-factory'

export const makeLoadUserDataController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadUserDataController = new LoadUserDataController(makeDbLoadUser(pool), makeDbLoadCompany(pool), makeDbLoadConfigsByUserId(pool))

  return new LogControllerDecorator(loadUserDataController, logMysqlRepository)
}
