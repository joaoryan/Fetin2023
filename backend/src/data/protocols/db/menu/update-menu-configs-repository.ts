import { UpdateMenuConfigsModel } from '../../../../domain/usecases/update-menu-configs'

export interface UpdateMenuConfigsRepository {
    updateMenuConfigs(menuConfigsData: UpdateMenuConfigsModel): Promise<void>
}
