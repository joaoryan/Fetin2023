import { EquipModel } from '../models/equipment'

export interface LoadEquipByPin {
  load(IOKPin: String): Promise<EquipModel>
}
