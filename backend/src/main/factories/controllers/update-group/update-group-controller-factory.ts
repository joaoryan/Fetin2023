import { UpdateGroupController } from '../../../../presentation/controller/update-group/update-group-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeUpdateGroupValidation } from './Update-group-validation-factory'
import { makeDbUpdateGroup } from '../../usecases/update-group/db-update-group-factory'

export const makeUpdateGroupController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateGroupController = new UpdateGroupController(makeUpdateGroupValidation(), makeDbUpdateGroup(pool))

  return new LogControllerDecorator(updateGroupController, logMysqlRepository)
}
