export interface EquipModel {
  id?: number,
  idUser: number,
  typeEquipment: string,
  storeId: number,
  serialNumber: string,
  creationDate: string,
  softwareVersion: string
  sentMenu: number,
  companyId: number,
  iokPin: string,
  name: string,
  categoryId: number,
  dataUpdate: boolean,
  appUpdate: boolean,
  statusData: string,
  statusApp: string,
  hashSw: string,
  menuId: number,
  lastUpdate: number
}

export interface EquipOvenModel {
  idEquipment?: number,
  name: string,
  typeEquipment: string,
  idUser: number,
  dataUpdate: boolean,
  statusData: string,
  appUpdate: boolean,
  statusApp: string,
  serialNumber: string,
  menuId: number,
  sentMenu: number,
  iokPin: string,
  creationDate: string,
  softwareVersion: string,
  hashSw: string,
  lastUpdate?: string,
  storeId?: number,
  companyId?: number,
  categoryId?: number
}

export interface CreatEquipOvenModel {
  idEquipment?: number,
  typeEquipment: string,
  dataUpdate: boolean,
  appUpdate: boolean,
  serialNumber: string,
  creationDate: string,
  softwareVersion: string
}

export interface UpdateEquipModel {
  id?: number,
  idUser: number,
  typeEquipment?: string,
  storeId?: number,
  serialNumber?: string,
  creationDate?: string,
  softwareVersion?: string
  sentMenu?: number,
  companyId?: number,
  iokPin: string,
  name?: string,
  categoryId?: number,
  dataUpdate?: boolean,
  appUpdate?: boolean,
  statusData?: string,
  statusApp?: string,
  hashSw?: string,
  menuId?: number,
  lastUpdate: number
}
