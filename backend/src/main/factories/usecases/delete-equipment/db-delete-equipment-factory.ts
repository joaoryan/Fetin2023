import { Pool } from 'mysql'
import { DbDeleteEquipment } from '../../../../data/usecases/delete-equipment/db-delete-equipment'
import { DeleteEquipment } from '../../../../domain/usecases/delete-equipment'
import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'

export const makeDbDeleteEquipment = (pool: Pool): DeleteEquipment => {
  const repository = new EquipMySqlRepository(pool)
  return new DbDeleteEquipment(repository)
}
