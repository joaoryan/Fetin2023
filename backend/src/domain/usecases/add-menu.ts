import { MenuModel } from '../models/menu'

export interface AddMenuModel {
  equipTypeId: number,
  companyId: number,
  menuName: string,
  creationDate: string,
  lastUpdate: string,
  menuVersion: number,
  deletionDate: string,
  userId: number,
  deletedBy: string,
  language: string
}

export interface AddMenu {
  add (account : AddMenuModel): Promise<MenuModel>
}
