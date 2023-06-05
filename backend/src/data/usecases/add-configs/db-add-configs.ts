import { ConfigsModel } from '../../../domain/models/configs'
import { AddConfigs, AddConfigsModel } from '../../../domain/usecases/add-configs'
import { AddConfigsRepository } from '../../protocols/db/configs/add-configs-repository'

export class DbAddConfigs implements AddConfigs {
  private readonly addConfigsRepository: AddConfigsRepository

  constructor (addConfigsRepository: AddConfigsRepository) {
    this.addConfigsRepository = addConfigsRepository
  }

  async add (configs: AddConfigsModel): Promise<ConfigsModel> {
    const savedConfigs = await this.addConfigsRepository.add(configs)
    if (savedConfigs) {
      return savedConfigs
    }
    return null
  }
}
