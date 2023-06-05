import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { makeUpdateCookbookBodyValidation } from './update-cookbook-body-validation-factory'
import { makeUpdateCookbookParamsValidation } from './update-cookbook-params-validation-factory'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { UpdateCookbookController } from '../../../../presentation/controller/update-cookbook/update-cookbook-controller'
import { makeDbUpdateCookbook } from '../../usecases/update-cookbook/db-update-cookbook-factory'

export const makeUpdateCookbookController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateCookbookController = new UpdateCookbookController(makeUpdateCookbookParamsValidation(), makeUpdateCookbookBodyValidation(), makeDbUpdateCookbook(pool))

  return new LogControllerDecorator(updateCookbookController, logMysqlRepository)
}
