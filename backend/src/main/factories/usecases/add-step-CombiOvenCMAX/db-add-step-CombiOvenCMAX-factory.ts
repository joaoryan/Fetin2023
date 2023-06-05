import { Pool } from 'mysql'
import { DbAddStepCombiOvenCMAX } from '../../../../data/usecases/add-step-CombiOvenCMAX/db-add-step-CombiOvenCMAX'
import { AddStepCombiOvenCMAX } from '../../../../domain/usecases/add-step-CombiOvenCMAX'
import { StepCombiOvenCMAXMySqlRepository } from '../../../../infra/db/mysql/step/step-CombiOvenCMAX-mysql-repository'

export const makeDbAddStepCombiOvenCMAX = (pool: Pool): AddStepCombiOvenCMAX => {
  const stepCombiOvenCMAXMySqlRepository = new StepCombiOvenCMAXMySqlRepository(pool)
  return new DbAddStepCombiOvenCMAX(stepCombiOvenCMAXMySqlRepository)
}
