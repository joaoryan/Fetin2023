import { AddGroupController } from '../../../../presentation/controller/add-group/add-group-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeAddGroupValidation } from './add-group-validation-factory'
import { makeDbAddGroup } from '../../usecases/add-group/db-add-group-factory'

export const makeAddGroupController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addGroupController = new AddGroupController(makeAddGroupValidation(), makeDbAddGroup(pool))

  return new LogControllerDecorator(addGroupController, logMysqlRepository)
}
