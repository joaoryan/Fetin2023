import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { LoadEquipByCompanyIdController } from '../../../../presentation/controller/load-equip-by-company-id/load-equip-by-company-id-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadEquipByCompanyId } from '../../usecases/load-equip-by-company-id/db-load-equip-by-company-id'
import { makeLoadEquipByCompanyIdValidation } from './load-equip-by-company-id-validation-factory'

export const makeLoadEquipByCompanyIdController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const loadEquipByCompanyIdController = new LoadEquipByCompanyIdController(makeDbLoadEquipByCompanyId(pool), makeLoadEquipByCompanyIdValidation())
  return new LogControllerDecorator(loadEquipByCompanyIdController, logMysqlRepository)
}
