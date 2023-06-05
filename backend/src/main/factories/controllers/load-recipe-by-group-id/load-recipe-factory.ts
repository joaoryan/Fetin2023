import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LoadRecipeController } from '../../../../presentation/controller/load-recipe-by-group-id/load-recipe-by-group-id-controller'
import { makeLoadRecipe } from '../../usecases/load-recipe/db-load-recipe-factory'
import { makeLoadRecipeValidation } from './load-recipe-validation-factory'

export const makeLoadRecipeController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadRecipeController = new LoadRecipeController(makeLoadRecipeValidation(), makeLoadRecipe(pool))
  return new LogControllerDecorator(loadRecipeController, logMysqlRepository)
}
