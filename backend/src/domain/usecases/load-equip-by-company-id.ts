import { EquipModel } from '../models/equipment'

export interface LoadEquipByCompanyId {
  load(companyId: number, userId: number, userPrivilegeUser: string): Promise<LoadEquipByCompanyId.Response[]>;
}

// eslint-disable-next-line no-redeclare
export namespace LoadEquipByCompanyId {
  export interface Response extends EquipModel {
    modelName: string
    categoryName: string
    storeName: string
    latitude: number
    longitude: number
  }
  export type Request = {
    params: {
      companyId: number,
      userId: number,
      userPrivilegeUser: string
    }
  }
}
