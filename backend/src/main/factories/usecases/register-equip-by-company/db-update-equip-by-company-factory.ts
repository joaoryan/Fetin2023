import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'
import { Pool } from 'mysql'
import { UpdateEquipByCompany } from '../../../../domain/usecases/update-equip-by-company'
import { DbUpdateEquipByCompany } from '../../../../data/usecases/update-equip-by-company/db-Update-equip-by-company'

export const makeUpdateEquipByCompany = (pool: Pool): UpdateEquipByCompany => {
  const equipMySqlRepository = new EquipMySqlRepository(pool)
  return new DbUpdateEquipByCompany(equipMySqlRepository)
}
