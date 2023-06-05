import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDeleteStepCombiOvenTSIValidation } from './delete-step-CombiOvenTSI-validation-factory'
import { DeleteStepCombiOvenTSIController } from '../../../../presentation/controller/delete-step-CombiOvenTSI/delete-step-CombiOvenTSI-controller'
import { makeDbDeleteStepCombiOvenTSI } from '../../usecases/delete-step-CombiOvenTSI/db-delete-step-CombiOvenTSI-factory'

export const makeDeleteStepCombiOvenTSIController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const stepCombiOvenTSIController = new DeleteStepCombiOvenTSIController(makeDeleteStepCombiOvenTSIValidation(), makeDbDeleteStepCombiOvenTSI(pool))

  return new LogControllerDecorator(stepCombiOvenTSIController, logMysqlRepository)
}
