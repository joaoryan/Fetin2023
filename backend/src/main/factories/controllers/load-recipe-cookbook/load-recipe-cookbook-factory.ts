import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoadRecipeCookbookValidation } from './load-recipe-cookbook-validation-factory'
import { LoadRecipeCookbookController } from '../../../../presentation/controller/load-cookbook-by-company-id/load-recipe-cookbook-controller'
import { makeLoadRecipeCookbook } from '../../usecases/load-recipe-cookbook/db-load-recipe-cookbook-factory'

export const makeLoadRecipeCookbookController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadRecipeCookbookController = new LoadRecipeCookbookController(makeLoadRecipeCookbookValidation(), makeLoadRecipeCookbook(pool))
  return new LogControllerDecorator(loadRecipeCookbookController, logMysqlRepository)
}
