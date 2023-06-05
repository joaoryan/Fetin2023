import { EquipModel } from '../../../usecases/load-equip-by-menu/db-load-equip-by-menu-protocols'

export interface LoadEquipBySerialNumberRepository {
  loadEquipBySerialNumber: (serialNumber: string) => Promise<EquipModel | null>
}
