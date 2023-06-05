import { MenuGroupModel } from '../models/menu-group'

export interface AddGroupModel {
  menuId: number,
  groupName: string,
  groupPosition: number,
  groupImage: string,
  preHeat: number,
  creationDate: string,
  lastUpdate: string
}

export interface AddGroup {
  addGroup(group: AddGroupModel): Promise<MenuGroupModel>
}
