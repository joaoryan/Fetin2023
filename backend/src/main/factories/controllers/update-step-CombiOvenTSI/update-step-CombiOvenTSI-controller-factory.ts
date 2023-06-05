import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { makeUpdateStepCombiOvenTSIBodyValidation } from './update-step-CombiOvenTSI-body-validation-factory'
import { makeUpdateStepCombiOvenTSIParamsValidation } from './update-step-CombiOvenTSI-params-validation-factory'
import { makeDbUpdateStepCombiOvenTSI } from '../../usecases/update-step-CombiOvenTSI/db-update-step-CombiOvenTSI-factory'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { UpdateStepCombiOvenTSIController } from '../../../../presentation/controller/update-step-CombiOvenTSI/update-step-CombiOvenTSI-controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeUpdateStepCombiOvenTSIController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateStepCombiOvenTSIController = new UpdateStepCombiOvenTSIController(makeUpdateStepCombiOvenTSIBodyValidation(), makeUpdateStepCombiOvenTSIParamsValidation(), makeDbUpdateStepCombiOvenTSI(pool))

  return new LogControllerDecorator(updateStepCombiOvenTSIController, logMysqlRepository)
}
