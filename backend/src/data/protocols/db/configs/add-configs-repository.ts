import { AddConfigsModel } from '../../../../domain/usecases/add-configs'
import { ConfigsModel } from '../../../../domain/models/configs'

export interface AddConfigsRepository {
    add (configsData: AddConfigsModel): Promise<ConfigsModel>
}
