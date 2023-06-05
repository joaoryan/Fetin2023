import { CreatEquipOvenModel, EquipOvenModel, EquipModel } from './../models/equipment'

export interface AddEquipment {
  add(equipment: CreatEquipOvenModel): Promise<EquipModel>
}

// eslint-disable-next-line no-redeclare
export namespace AddEquipment {
  export type Response = EquipOvenModel
  export type Request = {
    body: CreatEquipOvenModel,
    params: {
      pin?: string
    }
  }
}
