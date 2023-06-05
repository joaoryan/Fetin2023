import { Pool } from 'mysql'
import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'
import { DbLoadEquipBySerialNumber } from '../../../../data/usecases/load-equip-by-serialNumber/db-load-equip-by-serialNumber'
import { loadEquipBySerialNumber } from '../../../../domain/usecases/load-equip-by-serialNumber'

export const makeDbLoadEquipBySerialNumber = (pool: Pool): loadEquipBySerialNumber => {
  const loadEquipByRepository = new EquipMySqlRepository(pool)
  return new DbLoadEquipBySerialNumber(loadEquipByRepository)
}
