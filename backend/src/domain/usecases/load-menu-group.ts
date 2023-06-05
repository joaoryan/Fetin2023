import { MenuGroupModel } from '../models/menu-group'

export interface LoadMenuGroup {
    loadMenuGroup(idMenu: number): Promise<MenuGroupModel[] | null>
}
