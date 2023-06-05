import { AddMenuConfigsModel } from '../../../../domain/usecases/add-menu-configs'
import { MenuConfigsModel } from '../../../usecases/load-menu-configs/db-load-menu-configs-protocols'

export interface AddMenuConfigsRepository {
    addConfig(menuData: AddMenuConfigsModel): Promise<MenuConfigsModel>
}
