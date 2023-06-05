import { Pool } from 'mysql'
import { EquipMySqlRepository } from './../../../../infra/db/mysql/equipment/equip-mysql-repository'
import { DbLoadEquipByCompanyId } from './../../../../data/usecases/load-equip-by-company-id/db-load-equip-by-company-id'

export const makeDbLoadEquipByCompanyId = (pool: Pool): DbLoadEquipByCompanyId => {
  const loadEquipByCompanyRepository = new EquipMySqlRepository(pool)
  return new DbLoadEquipByCompanyId(loadEquipByCompanyRepository, loadEquipByCompanyRepository)
}
