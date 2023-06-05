import { Pool } from 'mysql'
import { DbLoadEquipByMenu } from '../../../../data/usecases/load-equip-by-menu/db-load-equip-by-menu'
import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'

export const makeDbLoadEquipByMenu = (pool: Pool): DbLoadEquipByMenu => {
  const loadByEquipMenu = new EquipMySqlRepository(pool)
  return new DbLoadEquipByMenu(loadByEquipMenu)
}
