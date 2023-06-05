export interface UpdateMenuModel {
  id: number,
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

export interface UpdateMenu {
  updateMenu(menu: UpdateMenuModel): Promise<void>
}
