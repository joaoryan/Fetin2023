import { Pool } from 'mysql'
import { DbLoadStepSpeedOven } from '../../../../data/usecases/load-step-speedOven/db-load-stepSpeedOven'
import { LoadStepSpeedOven } from '../../../../domain/usecases/load-stepSpeedOven'
import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'

export const makeStepSpeedOven = (pool: Pool): LoadStepSpeedOven => {
  const loadStepSpeedOven = new RecipeMySqlRepository(pool)
  return new DbLoadStepSpeedOven(loadStepSpeedOven)
}
