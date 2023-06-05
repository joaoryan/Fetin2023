import { EquipMySqlRepository } from '../../../../infra/db/mysql/equipment/equip-mysql-repository'
import { Pool } from 'mysql'
import { DbAddEquipment } from '../../../../data/usecases/add-equipment/db-add-equipment'
import { AddEquipment } from '../../../../domain/usecases/add-equipment'
import { CodeRandom } from '../../../../utils/factors/creat-randomString-factor'

export const makeDbAddEquipment = (pool: Pool): AddEquipment => {
  const codeRandom = new CodeRandom()
  const repository = new EquipMySqlRepository(pool)
  return new DbAddEquipment(repository, codeRandom)
}
