import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadStepCombiOvenCMAXController } from '../../../../presentation/controller/load-step-CombiOvenCMAX/load-step-CombiOvenCMAX-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadStepCombiOvenCMAX } from '../../usecases/load-step-CombiOvenCMAX/db-load-step-CombiOvenCMAX-factory'
import { makeLoadStepsCombiOvenCMAXByRecipeIdValidation } from './load-step-CombiOvenCMAX-validation-factory'

export const makeLoadStepCombiOvenCMAXController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadStepsCombiOvenCMAXByRecipeIdController = new LoadStepCombiOvenCMAXController(makeDbLoadStepCombiOvenCMAX(pool), makeLoadStepsCombiOvenCMAXByRecipeIdValidation())
  return new LogControllerDecorator(loadStepsCombiOvenCMAXByRecipeIdController, logMysqlRepository)
}
