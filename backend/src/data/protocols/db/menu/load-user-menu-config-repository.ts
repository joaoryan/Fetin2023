import { MenuConfigsModel } from '../../../../domain/models/menu-configs'

export interface LoadCompanyMenuCofigRepository {
    loadMenuConfig (idMenu: number): Promise<MenuConfigsModel>
}
