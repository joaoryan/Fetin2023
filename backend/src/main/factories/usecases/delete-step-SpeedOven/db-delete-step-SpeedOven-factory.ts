import { Pool } from 'mysql'
import { DbDeleteStepSpeedOven } from '../../../../data/usecases/delete-step-SpeedOven/db-delete-step-SpeedOven'
import { DeleteStepSpeedOven } from '../../../../domain/usecases/delete-step-SpeedOven'
import { StepSpeedOvenMySqlRepository } from '../../../../infra/db/mysql/step/step-SpeedOven-mysql-repository'

export const makeDbDeleteStepSpeedOven = (pool: Pool): DeleteStepSpeedOven => {
  const stepSpeedOvenMySqlRepository = new StepSpeedOvenMySqlRepository(pool)
  return new DbDeleteStepSpeedOven(stepSpeedOvenMySqlRepository)
}
