import { MenuGroupModel } from '../../../../domain/models/menu-group'

export interface LoadMenuGroupRepository {
    loadMenuGroup(idMenu: number): Promise<MenuGroupModel[]>
}
