import { Pool } from 'mysql'
import { AddStepCombiOvenTSIController } from '../../../../presentation/controller/add-step-CombiOvenTSI/add-step-CombiOvenTSI-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDbAddStepCombiOvenTSI } from '../../usecases/add-step-CombiOvenTSI/db-add-step-CombiOvenTSI-factory'
import { makeAddStepCombiOvenTSIValidation } from './add-step-CombiOvenTSI-validation-factory'

export const makeAddStepCombiOvenTSIController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addStepCombiOvenTSIController = new AddStepCombiOvenTSIController(makeAddStepCombiOvenTSIValidation(), makeDbAddStepCombiOvenTSI(pool))

  return new LogControllerDecorator(addStepCombiOvenTSIController, logMysqlRepository)
}
