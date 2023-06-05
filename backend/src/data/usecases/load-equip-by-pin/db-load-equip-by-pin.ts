import { EquipModel } from '../../../domain/models/equipment'
import { LoadEquipByPin } from '../../../domain/usecases/load-equip-by-pin'
import { LoadEquipByPinRepository } from '../../protocols/db/equipment/load-equip-by-pin-repository'

export class DbLoadEquipByPin implements LoadEquipByPin {
    private readonly loadequipByPinRepository: LoadEquipByPinRepository

    constructor (loadequipByPinRepository: LoadEquipByPinRepository) {
      this.loadequipByPinRepository = loadequipByPinRepository
    }

    async load (IOKPin: String): Promise<EquipModel> {
      const equip = await this.loadequipByPinRepository.loadByEquipPin(IOKPin)
      if (equip) {
        return equip
      }
      return null
    }
}
