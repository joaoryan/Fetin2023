import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { makeLoadGroupValidation } from './load-group-validation-factory'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoadGroup } from '../../usecases/load-group/db-load-group-factory'
import { LoadGroupController } from '../../../../presentation/controller/load-group-by-menu-id/load-group-controller'

export const makeLoadGroupController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadMenuController = new LoadGroupController(makeLoadGroupValidation(), makeLoadGroup(pool))
  return new LogControllerDecorator(loadMenuController, logMysqlRepository)
}
