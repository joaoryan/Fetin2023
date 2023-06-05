import { Pool } from 'mysql'
import { UpdateRecipeController } from '../../../../presentation/controller/Update-recipe/Update-recipe-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeUpdateRecipeValidation } from './Update-recipe-validation-factory'
import { makeUpdateRecipeCmaxValidation } from './Update-recipe-cmax-validation-factory'
import { makeDbUpdateRecipe } from '../../usecases/update-recipe/db-update-recipe-factory'
import { makeDbUpdateRecipeCmax } from '../../usecases/update-recipe-cmax/db-update-recipe-cmax-factory'

export const makeUpdateRecipeController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const updateRecipeController = new UpdateRecipeController(makeUpdateRecipeValidation(), makeUpdateRecipeCmaxValidation(), makeDbUpdateRecipe(pool), makeDbUpdateRecipeCmax(pool))

  return new LogControllerDecorator(updateRecipeController, logMysqlRepository)
}
