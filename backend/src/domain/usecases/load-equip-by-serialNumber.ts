import { EquipModel } from '../models/equipment'

export interface loadEquipBySerialNumber {
  loadEquip(serialNumber: string): Promise<EquipModel | null>
}
