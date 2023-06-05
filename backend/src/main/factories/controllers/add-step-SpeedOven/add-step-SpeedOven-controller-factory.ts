import { Pool } from 'mysql'
import { AddStepSpeedOvenController } from '../../../../presentation/controller/add-step-SpeedOven/add-step-SpeedOven-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDbAddStepSpeedOven } from '../../usecases/add-step-SpeedOven/db-add-step-SpeedOven-factory'
import { makeAddStepSpeedOvenValidation } from './add-step-SpeedOven-validation-factory'

export const makeAddStepSpeedOvenController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addStepSpeedOvenController = new AddStepSpeedOvenController(makeAddStepSpeedOvenValidation(), makeDbAddStepSpeedOven(pool))

  return new LogControllerDecorator(addStepSpeedOvenController, logMysqlRepository)
}
