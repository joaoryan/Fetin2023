import { ConfigsModel } from '../../../../domain/models/configs'
import { UpdateConfigsModel } from '../../../../domain/usecases/update-configs'

export interface UpdateConfigsRepository {
    updateConfigs (configs: UpdateConfigsModel): Promise<ConfigsModel>
}
