import { ConfigsModel } from '../../../domain/models/configs'
import { LoadConfigsByUserId } from '../../../domain/usecases/load-configs-by-user-id'
import { LoadConfigsByUserIdRepository } from '../../protocols/db/configs/load-configs-by-user-id-repository'

export class DbLoadConfigsByUserId implements LoadConfigsByUserId {
  private readonly loadConfigsByUserIdRepository: LoadConfigsByUserIdRepository

  constructor (loadConfigsByUserIdRepository: LoadConfigsByUserIdRepository) {
    this.loadConfigsByUserIdRepository = loadConfigsByUserIdRepository
  }

  async load (id: number): Promise<ConfigsModel> {
    const configs = await this.loadConfigsByUserIdRepository.loadByUserId(id)
    if (configs) {
      return configs
    }
    return null
  }
}
