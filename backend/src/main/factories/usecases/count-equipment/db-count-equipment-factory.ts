import { Pool } from 'mysql'
import { DbCountEquipment } from '../../../../data/usecases/count-equipment/db-count-equipment'
import { CountEquipment } from '../../../../domain/usecases/count-equipment'
import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'

export const makeDbCountEquipment = (pool: Pool): CountEquipment => {
  const repository = new EquipMySqlRepository(pool)
  return new DbCountEquipment(repository)
}
