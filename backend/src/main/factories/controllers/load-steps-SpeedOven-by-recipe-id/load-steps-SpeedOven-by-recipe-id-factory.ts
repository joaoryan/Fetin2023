import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadStepsSpeedOvenByRecipeIdController } from '../../../../presentation/controller/load-step-by-recipe-id/load-step-SpeedOven-by-recipe-id-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadStepSpeedOvenByRecipeId } from '../../usecases/load-step-SpeedOven-by-recipe-id/db-load-step-SpeedOven-by-recipe-id-factory'
import { makeLoadStepsSpeedOvenByRecipeIdValidation } from './load-steps-SpeedOven-by-recipe-id-validation-factory'

export const makeLoadStepsSpeedOvenByRecipeIdController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadStepsSpeedOvenByRecipeIdController = new LoadStepsSpeedOvenByRecipeIdController(makeDbLoadStepSpeedOvenByRecipeId(pool), makeLoadStepsSpeedOvenByRecipeIdValidation())
  return new LogControllerDecorator(loadStepsSpeedOvenByRecipeIdController, logMysqlRepository)
}
