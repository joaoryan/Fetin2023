import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadStepSpeedOvenByIdController } from '../../../../presentation/controller/load-step-by-id/load-step-SpeedOven-by-id-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadStepSpeedOvenById } from '../../usecases/load-step-SpeedOven-by-id/db-load-step-SpeedOven-by-id-factory'
import { makeLoadStepSpeedOvenByIdValidation } from './load-step-SpeedOven-by-id-validation-factory'

export const makeLoadStepSpeedOvenByIdController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadStepSpeedOvenByIdController = new LoadStepSpeedOvenByIdController(makeDbLoadStepSpeedOvenById(pool), makeLoadStepSpeedOvenByIdValidation())
  return new LogControllerDecorator(loadStepSpeedOvenByIdController, logMysqlRepository)
}
