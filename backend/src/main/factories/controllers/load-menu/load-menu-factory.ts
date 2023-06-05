import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Controller } from '../../../../presentation/protocols'
import { makeLoadMenuValidation } from './load-menu-validation-factory'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LoadMenuController } from '../../../../presentation/controller/load-menu/load-menu-controller'
import { makeLoadCompanyMenuConfigs } from '../../usecases/load-company-menu-configs/db-load-company-menu-config-factory'
import { makeLoadMenuById } from '../../usecases/load-menu-by-id/db-load-menu-factory'
import { makeLoadGroup } from '../../usecases/load-group/db-load-group-factory'
import { makeDbLoadStepSpeedOvenById } from '../../usecases/load-step-SpeedOven-by-id/db-load-step-speedOven-by-id-factory'
import { makeLoadRecipe } from '../../usecases/load-recipe/db-load-recipe-factory'
import { makeLoadRecipeCMAX } from '../../usecases/load-recipe-cmax/db-load-recipe-cmax-factory'
import { makeDbLoadStepCombiOvenTSI } from '../../usecases/load-step-CombiOvenTSI/db-load-step-CombiOvenTSI-factory'
import { makeDbLoadStepCombiOvenCMAX } from '../../usecases/load-step-combiOvenCMAX/db-load-step-combiOvenCMAX-factory'

export const makeLoadMenuController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadMenuController = new LoadMenuController(makeLoadMenuValidation(), makeLoadMenuById(pool), makeLoadCompanyMenuConfigs(pool), makeLoadGroup(pool), makeLoadRecipe(pool), makeLoadRecipeCMAX(pool), makeDbLoadStepSpeedOvenById(pool), makeDbLoadStepCombiOvenTSI(pool), makeDbLoadStepCombiOvenCMAX(pool))
  return new LogControllerDecorator(loadMenuController, logMysqlRepository)
}
