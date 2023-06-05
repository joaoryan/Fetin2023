import { EquipModel, CreatEquipOvenModel } from '../../../usecases/load-equip-by-menu/db-load-equip-by-menu-protocols'

export interface AddEquipmentRepository {
  addEquipment: (equipment: AddEquipmentRepository.Parameter) => Promise<AddEquipmentRepository.Result>
}

// eslint-disable-next-line no-redeclare
export namespace AddEquipmentRepository {
  export type Result = EquipModel
  export type Parameter = CreatEquipOvenModel
}
