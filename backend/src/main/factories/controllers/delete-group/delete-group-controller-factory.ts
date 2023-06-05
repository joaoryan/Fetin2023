import { DeleteGroupController } from '../../../../presentation/controller/delete-group/delete-group-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeDeleteGroupValidation } from './delete-group-validation-factory'
import { makeDbDeleteGroup } from '../../usecases/delete-group/db-delete-group-factory'

export const makeDeleteGroupController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const deleteGroupController = new DeleteGroupController(makeDeleteGroupValidation(), makeDbDeleteGroup(pool))

  return new LogControllerDecorator(deleteGroupController, logMysqlRepository)
}
