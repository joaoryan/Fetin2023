import { Pool } from 'mysql'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDeleteRecipeValidation } from './delete-recipe-validation-factory'
import { DeleteRecipeController } from '../../../../presentation/controller/delete-recipe/delete-recipe-controller'
import { makeDbDeleteRecipe } from '../../usecases/delete-recipe/db-delete-recipe-factory'

export const makeDeleteRecipeController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const recipeController = new DeleteRecipeController(makeDeleteRecipeValidation(), makeDbDeleteRecipe(pool))

  return new LogControllerDecorator(recipeController, logMysqlRepository)
}
