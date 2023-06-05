import { MenuGroupModel } from '../models/menu-group'

export interface UpdateGroupModel {
  id: number,
  menuId: number,
  groupName: string,
  groupPosition: number,
  groupImage: string,
  preHeat: number,
  creationDate: string,
  lastUpdate: string
}

export interface UpdateGroup {
  updateGroup(group: UpdateGroupModel): Promise<MenuGroupModel>
}
