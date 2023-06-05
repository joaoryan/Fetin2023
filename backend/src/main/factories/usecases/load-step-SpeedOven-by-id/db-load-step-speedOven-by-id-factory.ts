import { Pool } from 'mysql'
import { LoadStepSpeedOvenById } from '../../../../domain/usecases/load-step-SpeedOven-by-id'
import { DbLoadStepSpeedOvenById } from '../../../../data/usecases/load-step-SpeedOven-by-id/db-load-step-SpeedOven-by-id'
import { StepSpeedOvenMySqlRepository } from '../../../../infra/db/mysql/step/step-SpeedOven-mysql-repository'

export const makeDbLoadStepSpeedOvenById = (pool: Pool): LoadStepSpeedOvenById => {
  const stepSpeedOvenMySqlRepository = new StepSpeedOvenMySqlRepository(pool)
  return new DbLoadStepSpeedOvenById(stepSpeedOvenMySqlRepository)
}
