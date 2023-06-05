import { UpdateEquipModel } from '../models/equipment'

export interface UpdateEquipment {
  update(id: number, equipment: UpdateEquipModel): Promise<boolean>
}

// eslint-disable-next-line no-redeclare
export namespace UpdateEquipment {
  export type Request = {
    body: { equipment?: UpdateEquipModel }
    params: { id?: number }
  }
}
