import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { makeUpdateStepCombiOvenCMAXBodyValidation } from './update-step-CombiOvenCMAX-body-validation-factory'
import { makeUpdateStepCombiOvenCMAXParamsValidation } from './update-step-CombiOvenCMAX-params-validation-factory'
import { makeDbUpdateStepCombiOvenCMAX } from '../../usecases/update-step-CombiOvenCMAX/db-update-step-CombiOvenCMAX-factory'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { UpdateStepCombiOvenCMAXController } from '../../../../presentation/controller/update-step-CombiOvenCMAX/update-step-CombiOvenCMAX-controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeUpdateStepCombiOvenCMAXController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateStepCombiOvenCMAXController = new UpdateStepCombiOvenCMAXController(makeUpdateStepCombiOvenCMAXBodyValidation(), makeUpdateStepCombiOvenCMAXParamsValidation(), makeDbUpdateStepCombiOvenCMAX(pool))

  return new LogControllerDecorator(updateStepCombiOvenCMAXController, logMysqlRepository)
}
