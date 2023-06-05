import { Pool } from 'mysql'
import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'
import { DbLoadEquipById } from '../../../../data/usecases/load-equip-by-id/db-load-equip-by-id'

export const makeDbLoadEquipById = (pool: Pool): DbLoadEquipById => {
  const loadEquipByRepository = new EquipMySqlRepository(pool)
  return new DbLoadEquipById(loadEquipByRepository)
}
