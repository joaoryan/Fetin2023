import { Pool } from 'mysql'
import { DbDeleteStepCombiOvenTSI } from '../../../../data/usecases/delete-step-CombiOvenTSI/db-delete-step-CombiOvenTSI'
import { DeleteStepCombiOvenTSI } from '../../../../domain/usecases/delete-step-CombiOvenTSI'
import { StepCombiOvenTSIMySqlRepository } from '../../../../infra/db/mysql/step/step-CombiOvenTSI-mysql-repository'

export const makeDbDeleteStepCombiOvenTSI = (pool: Pool): DeleteStepCombiOvenTSI => {
  const stepCombiOvenTSIMySqlRepository = new StepCombiOvenTSIMySqlRepository(pool)
  return new DbDeleteStepCombiOvenTSI(stepCombiOvenTSIMySqlRepository)
}
