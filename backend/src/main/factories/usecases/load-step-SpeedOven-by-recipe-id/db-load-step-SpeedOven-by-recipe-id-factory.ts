import { Pool } from 'mysql'
import { LoadStepsSpeedOvenByRecipeId } from '../../../../domain/usecases/load-step-SpeedOven-by-recipe-id'
import { DbLoadStepsSpeedOvenByRecipeId } from '../../../../data/usecases/load-step-SpeedOven-by-recipe-id/db-load-step-SpeedOven-by-recipe-id'
import { StepSpeedOvenMySqlRepository } from '../../../../infra/db/mysql/step/step-SpeedOven-mysql-repository'

export const makeDbLoadStepSpeedOvenByRecipeId = (pool: Pool): LoadStepsSpeedOvenByRecipeId => {
  const stepSpeedOvenMySqlRepository = new StepSpeedOvenMySqlRepository(pool)
  return new DbLoadStepsSpeedOvenByRecipeId(stepSpeedOvenMySqlRepository)
}
