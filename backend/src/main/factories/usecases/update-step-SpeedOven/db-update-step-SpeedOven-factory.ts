import { Pool } from 'mysql'
import { DbUpdateStepSpeedOven } from '../../../../data/usecases/update-step-SpeedOven/db-update-step-SpeedOven'
import { UpdateStepSpeedOven } from '../../../../domain/usecases/update-step-SpeedOven'
import { StepSpeedOvenMySqlRepository } from '../../../../infra/db/mysql/step/step-SpeedOven-mysql-repository'

export const makeDbUpdateStepSpeedOven = (pool: Pool): UpdateStepSpeedOven => {
  const stepSpeedOvenMySqlRepository = new StepSpeedOvenMySqlRepository(pool)
  return new DbUpdateStepSpeedOven(stepSpeedOvenMySqlRepository)
}
