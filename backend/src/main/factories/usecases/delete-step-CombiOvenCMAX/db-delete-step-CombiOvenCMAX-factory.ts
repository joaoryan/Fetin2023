import { Pool } from 'mysql'
import { DbDeleteStepCombiOvenCMAX } from '../../../../data/usecases/delete-step-CombiOvenCMAX/db-delete-step-CombiOvenCMAX'
import { DeleteStepCombiOvenCMAX } from '../../../../domain/usecases/delete-step-CombiOvenCMAX'
import { StepCombiOvenCMAXMySqlRepository } from '../../../../infra/db/mysql/step/step-CombiOvenCMAX-mysql-repository'

export const makeDbDeleteStepCombiOvenCMAX = (pool: Pool): DeleteStepCombiOvenCMAX => {
  const stepCombiOvenCMAXMySqlRepository = new StepCombiOvenCMAXMySqlRepository(pool)
  return new DbDeleteStepCombiOvenCMAX(stepCombiOvenCMAXMySqlRepository)
}
