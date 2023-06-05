import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { makeAddCookbookBodyValidation } from './add-cookbook-body-validation-factory'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { AddCookbookController } from '../../../../presentation/controller/add-cookbook/add-cookbook-controller'
import { makeDbAddCookbook } from '../../usecases/add-cookbook/db-add-cookbook-factory'

export const makeAddCookbookController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addCookbookController = new AddCookbookController(makeAddCookbookBodyValidation(), makeDbAddCookbook(pool))

  return new LogControllerDecorator(addCookbookController, logMysqlRepository)
}
