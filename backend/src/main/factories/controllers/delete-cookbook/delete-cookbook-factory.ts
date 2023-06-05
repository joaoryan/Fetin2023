import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDeleteCookbookValidation } from './delete-cookbook-validation-factory'
import { DeleteCookbookController } from '../../../../presentation/controller/delete-cookbook/delete-cookbook-controller'
import { makeDeleteCookbook } from '../../usecases/delete-cookbook/db-delete-cookbook-factory'

export const makeDeleteCookbookController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const deleteCookbookController = new DeleteCookbookController(makeDeleteCookbookValidation(), makeDeleteCookbook(pool))
  return new LogControllerDecorator(deleteCookbookController, logMysqlRepository)
}
