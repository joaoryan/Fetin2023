import { Pool } from 'mysql'
import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'
import { DbUpdateEquipment } from '../../../../data/usecases/update-equipment/db-update-equipment'
import { UpdateEquipment } from '../../../../domain/usecases/update-equipment'

export const makeDbUpdateEquipment = (pool: Pool): UpdateEquipment => {
  const repository = new EquipMySqlRepository(pool)
  return new DbUpdateEquipment(repository)
}
