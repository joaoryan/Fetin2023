import { Pool } from 'mysql'
import { DbAddStepSpeedOven } from '../../../../data/usecases/add-step-SpeedOven/db-add-step-SpeedOven'
import { AddStepSpeedOven } from '../../../../domain/usecases/add-step-SpeedOven'
import { StepSpeedOvenMySqlRepository } from '../../../../infra/db/mysql/step/step-SpeedOven-mysql-repository'

export const makeDbAddStepSpeedOven = (pool: Pool): AddStepSpeedOven => {
  const stepSpeedOvenMySqlRepository = new StepSpeedOvenMySqlRepository(pool)
  return new DbAddStepSpeedOven(stepSpeedOvenMySqlRepository)
}
