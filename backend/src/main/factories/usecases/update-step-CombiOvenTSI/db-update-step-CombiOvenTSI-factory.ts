import { Pool } from 'mysql'
import { DbUpdateStepCombiOvenTSI } from '../../../../data/usecases/update-step-CombiOvenTSI/db-update-step-CombiOvenTSI'
import { UpdateStepCombiOvenTSI } from '../../../../domain/usecases/update-step-CombiOvenTSI'
import { StepCombiOvenTSIMySqlRepository } from '../../../../infra/db/mysql/step/step-CombiOvenTSI-mysql-repository'

export const makeDbUpdateStepCombiOvenTSI = (pool: Pool): UpdateStepCombiOvenTSI => {
  const stepCombiOvenTSIMySqlRepository = new StepCombiOvenTSIMySqlRepository(pool)
  return new DbUpdateStepCombiOvenTSI(stepCombiOvenTSIMySqlRepository)
}
