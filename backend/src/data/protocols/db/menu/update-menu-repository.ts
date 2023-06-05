import { UpdateMenuModel } from '../../../../domain/usecases/update-menu'

export interface UpdateMenuRepository {
    updateMenu(menuData: UpdateMenuModel): Promise<void>
}
