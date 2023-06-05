import { EquipModel } from '../models/equipment'

export interface LoadEquipByMenu {
  loadEquip (menuId: number): Promise<EquipModel[] | null>
}
