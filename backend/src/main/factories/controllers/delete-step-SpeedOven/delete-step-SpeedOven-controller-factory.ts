import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDeleteStepSpeedOvenValidation } from './delete-step-SpeedOven-validation-factory'
import { DeleteStepSpeedOvenController } from '../../../../presentation/controller/delete-step-SpeedOven/delete-step-SpeedOven-controller'
import { makeDbDeleteStepSpeedOven } from '../../usecases/delete-step-SpeedOven/db-delete-step-SpeedOven-factory'

export const makeDeleteStepSpeedOvenController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const stepSpeedOvenController = new DeleteStepSpeedOvenController(makeDeleteStepSpeedOvenValidation(), makeDbDeleteStepSpeedOven(pool))

  return new LogControllerDecorator(stepSpeedOvenController, logMysqlRepository)
}
