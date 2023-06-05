import { CreatEquipOvenModel, EquipModel } from '../../../domain/models/equipment'
import { AddEquipment } from '../../../domain/usecases/add-equipment'
import { AddEquipmentRepository } from '../../protocols/db/equipment/add-equipment-repository'
import { CreateCodeRandom } from '../../protocols/db/user/create-code-random-repository'

export class DbAddEquipment implements AddEquipment {
  private readonly repository: AddEquipmentRepository
  private readonly codeRandomRepository: CreateCodeRandom
  constructor (repository: AddEquipmentRepository, codeRandomRepository: CreateCodeRandom) {
    this.repository = repository
    this.codeRandomRepository = codeRandomRepository
  }

  async add (equipment: CreatEquipOvenModel): Promise<EquipModel> {
    const pin = await this.codeRandomRepository.codeRandom()
    Object.assign(equipment, { iokPin: pin })
    delete equipment.idEquipment
    const equipmentResponse = await this.repository.addEquipment(equipment)
    return equipmentResponse
  }
}
