import { DeleteEquipment } from '../../../domain/usecases/delete-equipment'
import { DeleteEquipmentRepository } from '../../protocols/db/equipment/delete-equipment-repository'

export class DbDeleteEquipment implements DeleteEquipment {
  private readonly repository: DeleteEquipmentRepository
  constructor (repository: DeleteEquipmentRepository) {
    this.repository = repository
  }

  async delete (id: number): Promise<boolean> {
    return await this.repository.deleteEquipment(id)
  }
}
