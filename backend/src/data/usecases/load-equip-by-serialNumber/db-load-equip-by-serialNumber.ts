import { loadEquipBySerialNumber } from '../../../domain/usecases/load-equip-by-serialNumber'
import { LoadEquipBySerialNumberRepository } from '../../protocols/db/equipment/load-equip-by-serialNumber-repository'
import { EquipModel } from '../load-equip-by-menu/db-load-equip-by-menu-protocols'

export class DbLoadEquipBySerialNumber implements loadEquipBySerialNumber {
  private readonly repository: LoadEquipBySerialNumberRepository
  constructor (repository: LoadEquipBySerialNumberRepository) {
    this.repository = repository
  }

  async loadEquip (serialNumber: string): Promise<EquipModel> {
    return this.repository.loadEquipBySerialNumber(serialNumber)
  }
}
