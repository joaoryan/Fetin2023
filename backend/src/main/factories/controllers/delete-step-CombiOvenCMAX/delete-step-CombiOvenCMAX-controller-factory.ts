import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDeleteStepCombiOvenCMAXValidation } from './delete-step-CombiOvenCMAX-validation-factory'
import { DeleteStepCombiOvenCMAXController } from '../../../../presentation/controller/delete-step-CombiOvenCMAX/delete-step-CombiOvenCMAX-controller'
import { makeDbDeleteStepCombiOvenCMAX } from '../../usecases/delete-step-CombiOvenCMAX/db-delete-step-CombiOvenCMAX-factory'

export const makeDeleteStepCombiOvenCMAXController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const stepCombiOvenCMAXController = new DeleteStepCombiOvenCMAXController(makeDeleteStepCombiOvenCMAXValidation(), makeDbDeleteStepCombiOvenCMAX(pool))

  return new LogControllerDecorator(stepCombiOvenCMAXController, logMysqlRepository)
}
