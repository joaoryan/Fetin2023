import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LoadRecipeCmaxController } from '../../../../presentation/controller/load-recipeCmax-by-menu-id/load-recipeCmax-by-menu-id-controller'
import { makeLoadRecipeCMAX } from '../../usecases/load-recipe-cmax/db-load-recipe-cmax-factory'
import { makeLoadRecipeCmaxValidation } from './load-recipe-validation-factory'

export const makeLoadRecipeCmaxController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadRecipeController = new LoadRecipeCmaxController(makeLoadRecipeCmaxValidation(), makeLoadRecipeCMAX(pool))
  return new LogControllerDecorator(loadRecipeController, logMysqlRepository)
}
