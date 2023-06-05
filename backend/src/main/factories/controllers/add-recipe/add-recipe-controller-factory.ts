import { Pool } from 'mysql'
import { AddRecipeController } from '../../../../presentation/controller/add-recipe/add-recipe-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDbAddRecipe } from '../../usecases/add-recipe/db-add-recipe-factory'
import { makeDbAddRecipeCmax } from '../../usecases/add-recipe-cmax/db-add-recipe-cmax-factory'
import { makeAddRecipeValidation } from './add-recipe-validation-factory'
import { makeAddRecipeCmaxValidation } from './add-recipe-cmax-validation-factory'

export const makeAddRecipeController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const addRecipeCmaxController = new AddRecipeController(makeAddRecipeValidation(), makeAddRecipeCmaxValidation(), makeDbAddRecipe(pool), makeDbAddRecipeCmax(pool))

  return new LogControllerDecorator(addRecipeCmaxController, logMysqlRepository)
}
