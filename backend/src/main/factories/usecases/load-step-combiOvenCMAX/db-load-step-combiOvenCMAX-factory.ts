import { Pool } from 'mysql'
import { LoadStepCombiOvenCMAX } from '../../../../domain/usecases/load-step-CombiOvenCMAX'
import { DbLoadStepCombiOvenCMAX } from '../../../../data/usecases/load-step-CombiOvenCMAX/db-load-step-CombiOvenCMAX'
import { StepCombiOvenCMAXMySqlRepository } from '../../../../infra/db/mysql/step/step-CombiOvenCMAX-mysql-repository'

export const makeDbLoadStepCombiOvenCMAX = (pool: Pool): LoadStepCombiOvenCMAX => {
  const stepCombiOvenCMAXMySqlRepository = new StepCombiOvenCMAXMySqlRepository(pool)
  return new DbLoadStepCombiOvenCMAX(stepCombiOvenCMAXMySqlRepository)
}
