import { UpdateEquipment } from '../../../domain/usecases/update-equipment'
import { UpdateEquipmentRepository } from '../../protocols/db/equipment/update-equipment-repository'
import { UpdateEquipModel } from '../load-equip-by-menu/db-load-equip-by-menu-protocols'

export class DbUpdateEquipment implements UpdateEquipment {
  private readonly repository: UpdateEquipmentRepository
  constructor (repository: UpdateEquipmentRepository) {
    this.repository = repository
  }

  async update (id: number, equipment: UpdateEquipModel): Promise<boolean> {
    return await this.repository.updateEquipment(id, equipment)
  }
}
