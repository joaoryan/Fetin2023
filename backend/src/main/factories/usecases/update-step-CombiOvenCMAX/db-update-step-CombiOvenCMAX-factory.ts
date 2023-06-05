import { Pool } from 'mysql'
import { DbUpdateStepCombiOvenCMAX } from '../../../../data/usecases/update-step-CombiOvenCMAX/db-update-step-CombiOvenCMAX'
import { UpdateStepCombiOvenCMAX } from '../../../../domain/usecases/update-step-CombiOvenCMAX'
import { StepCombiOvenCMAXMySqlRepository } from '../../../../infra/db/mysql/step/step-CombiOvenCMAX-mysql-repository'

export const makeDbUpdateStepCombiOvenCMAX = (pool: Pool): UpdateStepCombiOvenCMAX => {
  const stepCombiOvenCMAXMySqlRepository = new StepCombiOvenCMAXMySqlRepository(pool)
  return new DbUpdateStepCombiOvenCMAX(stepCombiOvenCMAXMySqlRepository)
}
