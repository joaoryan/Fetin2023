import { UpdateEquipByCompany } from '../../../domain/usecases/update-equip-by-company'
import { RegisterEquipRepository } from '../../protocols/db/equipment/register-equip-repository'

export class DbUpdateEquipByCompany implements UpdateEquipByCompany {
  private readonly registerEquipRepository: RegisterEquipRepository

  constructor (registerEquipRepository: RegisterEquipRepository) {
    this.registerEquipRepository = registerEquipRepository
  }

  async update (idEquip: number, idCompany: number): Promise<void> {
    await this.registerEquipRepository.registerEquip(idEquip, idCompany)
  }
}
