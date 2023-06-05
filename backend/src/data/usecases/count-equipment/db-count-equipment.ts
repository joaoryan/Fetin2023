import { CountEquipment } from '../../../domain/usecases/count-equipment'
import { CountEquipmentRepository } from '../../protocols/db/equipment/count-equipment-repository'

export class DbCountEquipment implements CountEquipment {
  private readonly repository: CountEquipmentRepository
  constructor (repository: CountEquipmentRepository) {
    this.repository = repository
  }

  async count (where?: CountEquipment.Parameter): Promise<CountEquipment.Response> {
    return this.repository.countEquipment(where)
  }
}
