import { Pool } from 'mysql'
import { DbAddStepCombiOvenTSI } from '../../../../data/usecases/add-step-CombiOvenTSI/db-add-step-CombiOvenTSI'
import { AddStepCombiOvenTSI } from '../../../../domain/usecases/add-step-CombiOvenTSI'
import { StepCombiOvenTSIMySqlRepository } from '../../../../infra/db/mysql/step/step-CombiOvenTSI-mysql-repository'

export const makeDbAddStepCombiOvenTSI = (pool: Pool): AddStepCombiOvenTSI => {
  const stepCombiOvenTSIMySqlRepository = new StepCombiOvenTSIMySqlRepository(pool)
  return new DbAddStepCombiOvenTSI(stepCombiOvenTSIMySqlRepository)
}
