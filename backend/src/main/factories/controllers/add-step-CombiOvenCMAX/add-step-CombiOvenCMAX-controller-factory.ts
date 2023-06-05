import { Pool } from 'mysql'
import { AddStepCombiOvenCMAXController } from '../../../../presentation/controller/add-step-CombiOvenCMAX/add-step-CombiOvenCMAX-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDbAddStepCombiOvenCMAX } from '../../usecases/add-step-CombiOvenCMAX/db-add-step-CombiOvenCMAX-factory'
import { makeAddStepCombiOvenCMAXValidation } from './add-step-CombiOvenCMAX-validation-factory'

export const makeAddStepCombiOvenCMAXController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addStepCombiOvenCMAXController = new AddStepCombiOvenCMAXController(makeAddStepCombiOvenCMAXValidation(), makeDbAddStepCombiOvenCMAX(pool))

  return new LogControllerDecorator(addStepCombiOvenCMAXController, logMysqlRepository)
}
