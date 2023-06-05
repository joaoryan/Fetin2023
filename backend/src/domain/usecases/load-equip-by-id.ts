import { EquipOvenModel, EquipModel } from '../models/equipment'

export interface LoadEquipById {
  load(id: number): Promise<LoadEquipById.Response>;
}

// eslint-disable-next-line no-redeclare
export namespace LoadEquipById {
  export type Response = EquipModel & {
    modelName: string
    categoryName: string
    storeName: string
    menuName: string
    address: string
    city: string
    zipCode: string
  } | null
  export type Request = {
    params: {
      id: number
    }
  }
}

export namespace LoadHasUpdateEquip {
  export type Response = EquipOvenModel | null
  export type Request = {
    params: {
      idEquip: number,
      iokPin: string
    }
  }
}
