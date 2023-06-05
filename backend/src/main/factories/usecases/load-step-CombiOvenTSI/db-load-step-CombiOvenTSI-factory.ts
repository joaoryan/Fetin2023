import { Pool } from 'mysql'
import { LoadStepCombiOvenTSI } from '../../../../domain/usecases/load-step-CombiOvenTSI'
import { DbLoadStepCombiOvenTSI } from '../../../../data/usecases/load-step-CombiOvenTSI/db-load-step-CombiOvenTSI'
import { StepCombiOvenTSIMySqlRepository } from '../../../../infra/db/mysql/step/step-CombiOvenTSI-mysql-repository'

export const makeDbLoadStepCombiOvenTSI = (pool: Pool): LoadStepCombiOvenTSI => {
  const stepCombiOvenTSIMySqlRepository = new StepCombiOvenTSIMySqlRepository(pool)
  return new DbLoadStepCombiOvenTSI(stepCombiOvenTSIMySqlRepository)
}
