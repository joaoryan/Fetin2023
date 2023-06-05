import { ConfigsModel } from '../models/configs'

export interface LoadConfigsByUserId {
  load (id: number): Promise<ConfigsModel | null>
}
