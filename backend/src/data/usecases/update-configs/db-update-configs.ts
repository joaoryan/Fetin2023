import { ConfigsModel } from '../../../domain/models/configs'
import { UpdateConfigs, UpdateConfigsModel } from '../../../domain/usecases/update-configs'
import { LoadConfigsByUserIdRepository } from '../../protocols/db/configs/load-configs-by-user-id-repository'
import { UpdateConfigsRepository } from '../../protocols/db/configs/update-configs-repository'

export class DbUpdateConfigs implements UpdateConfigs {
  private readonly updateConfigsRepository: UpdateConfigsRepository
  private readonly loadConfigsRepository: LoadConfigsByUserIdRepository

  constructor (updateConfigsRepository: UpdateConfigsRepository, loadConfigsRepository: LoadConfigsByUserIdRepository) {
    this.updateConfigsRepository = updateConfigsRepository
    this.loadConfigsRepository = loadConfigsRepository
  }

  async updateConfigs (configs: UpdateConfigsModel): Promise<ConfigsModel> {
    await this.updateConfigsRepository.updateConfigs(configs)
    const result = await this.loadConfigsRepository.loadByUserId(configs.id)
    if (result) {
      return result
    }
    return null
  }
}
