import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoadUserByCompanyValidation } from './load-user-by-company-validation-factory'
import { makeDbLoadUserByCompany } from '../../usecases/load-user-by-company/db-load-user-by-company-factory'
import { LoadUserByCompanyController } from '../../../../presentation/controller/load-user-by-company/load-user-by-company-controller'

export const makeLoadUserByCompanyController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadUserDataController = new LoadUserByCompanyController(makeLoadUserByCompanyValidation(), makeDbLoadUserByCompany(pool))
  return new LogControllerDecorator(loadUserDataController, logMysqlRepository)
}
