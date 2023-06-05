import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadCompanyTypesController } from '../../../../presentation/controller/load-companyTypes/load-companyTypes.controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoadCompanyTypesValidation } from './load-companyTypes-validation-factory'
import { makeDbLoadCompanyTypes } from '../../usecases/load-companyTypes/db-load-companyTypes-factory'

export const makeLoadCompanyTypesController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadCompanyTypesController = new LoadCompanyTypesController(makeDbLoadCompanyTypes(pool), makeLoadCompanyTypesValidation())
  return new LogControllerDecorator(loadCompanyTypesController, logMysqlRepository)
}
