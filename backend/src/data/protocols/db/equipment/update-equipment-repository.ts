import { UpdateEquipModel } from '../../../usecases/load-equip-by-menu/db-load-equip-by-menu-protocols'

export interface UpdateEquipmentRepository {
  updateEquipment(id: number, equipment: UpdateEquipmentRepository.Parameter): Promise<boolean>
}

// eslint-disable-next-line no-redeclare
export namespace UpdateEquipmentRepository {
  export type Parameter = UpdateEquipModel
}
