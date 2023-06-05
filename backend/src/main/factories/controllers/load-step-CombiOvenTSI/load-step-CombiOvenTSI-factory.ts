import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadStepCombiOvenTSIController } from '../../../../presentation/controller/load-step-CombiOvenTSI/load-step-CombiOvenTSI-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadStepCombiOvenTSI } from '../../usecases/load-step-CombiOvenTSI/db-load-step-CombiOvenTSI-factory'
import { makeLoadStepsCombiOvenTSIByRecipeIdValidation } from './load-step-CombiOvenTSI-validation-factory'

export const makeLoadStepCombiOvenTSIController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadStepsCombiOvenTSIByRecipeIdController = new LoadStepCombiOvenTSIController(makeDbLoadStepCombiOvenTSI(pool), makeLoadStepsCombiOvenTSIByRecipeIdValidation())
  return new LogControllerDecorator(loadStepsCombiOvenTSIByRecipeIdController, logMysqlRepository)
}
