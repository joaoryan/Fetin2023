import { ConfigsModel } from '../../../../domain/models/configs'

export interface LoadConfigsByUserIdRepository {
  loadByUserId(id: number): Promise<ConfigsModel | null>
}
