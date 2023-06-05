import { MenuModel } from '../../../../domain/models/menu'
import { AddMenuModel } from '../../../../domain/usecases/add-menu'

export interface AddMenuRepository {
    add(menuData: AddMenuModel): Promise<MenuModel>
}
