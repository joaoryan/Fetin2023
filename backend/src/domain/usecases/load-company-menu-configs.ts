import { MenuConfigsModel } from '../models/menu-configs'

export interface LoadCompanyMenuConfigs {
    loadMenuConfigs (idMenu: number): Promise<MenuConfigsModel | null>
}
