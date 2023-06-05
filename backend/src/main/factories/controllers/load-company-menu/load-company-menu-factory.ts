import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LoadCompanyMenuController } from '../../../../presentation/controller/load-menu-by-company-id/load-menu-by-company-id-controller'
import { makeLoadCompanyMenu } from '../../usecases/load-company-menu/db-load-company-menu-factory'
import { makeLoadCompanyMenuConfigs } from '../../usecases/load-company-menu-configs/db-load-company-menu-config-factory'

export const makeLoadCompanyMenuController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadCompanyMenuController = new LoadCompanyMenuController(makeLoadCompanyMenu(pool), makeLoadCompanyMenuConfigs(pool))
  return new LogControllerDecorator(loadCompanyMenuController, logMysqlRepository)
}
