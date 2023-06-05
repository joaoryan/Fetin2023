import { ConfigsModel } from '../../../../domain/models/configs'
import { AddConfigsModel } from '../../../../domain/usecases/add-configs'

export const mapCreatedConfigs = (addedConfigs: AddConfigsModel, addedConfigsId: number): ConfigsModel => {
  return Object.assign({}, addedConfigs, { id: addedConfigsId })
}
