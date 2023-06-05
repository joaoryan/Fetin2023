import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { makeUpdateStepSpeedOvenBodyValidation } from './update-step-SpeedOven-body-validation-factory'
import { makeUpdateStepSpeedOvenParamsValidation } from './update-step-SpeedOven-params-validation-factory'
import { makeDbUpdateStepSpeedOven } from '../../usecases/update-step-SpeedOven/db-update-step-SpeedOven-factory'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { UpdateStepSpeedOvenController } from '../../../../presentation/controller/update-step-SpeedOven/update-step-SpeedOven-controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeUpdateStepSpeedOvenController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateStepSpeedOvenController = new UpdateStepSpeedOvenController(makeUpdateStepSpeedOvenBodyValidation(), makeUpdateStepSpeedOvenParamsValidation(), makeDbUpdateStepSpeedOven(pool))

  return new LogControllerDecorator(updateStepSpeedOvenController, logMysqlRepository)
}
