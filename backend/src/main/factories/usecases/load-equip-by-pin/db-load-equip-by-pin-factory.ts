import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'
import { Pool } from 'mysql'
import { LoadEquipByPin } from '../../../../domain/usecases/load-equip-by-pin'
import { DbLoadEquipByPin } from '../../../../data/usecases/load-equip-by-pin/db-load-equip-by-pin'

export const makeLoadEquipByPin = (pool: Pool): LoadEquipByPin => {
  const loadByEquipPin = new EquipMySqlRepository(pool)
  return new DbLoadEquipByPin(loadByEquipPin)
}
