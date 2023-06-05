import { AddMenuModel } from '../../../../domain/usecases/add-menu'
import { MenuModel } from '../../../../domain/models/menu'

export const mapCreatedMenu = (addedMenu: AddMenuModel, addedAccountId: number): MenuModel => {
  return Object.assign({}, addedMenu, { id: addedAccountId })
}
