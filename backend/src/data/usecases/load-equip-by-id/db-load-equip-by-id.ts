import { LoadEquipById } from '../../../domain/usecases/load-equip-by-id'
import { LoadEquipByIdRepository } from '../../protocols/db/equipment/load-equip-by-id-repository'

export class DbLoadEquipById implements LoadEquipById {
  private readonly repository: LoadEquipByIdRepository
  constructor (repository: LoadEquipByIdRepository) {
    this.repository = repository
  }

  async load (id: number): Promise<LoadEquipByIdRepository.Result> {
    return this.repository.loadEquipById(id)
  }
}
