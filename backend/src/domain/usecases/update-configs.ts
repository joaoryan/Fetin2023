import { ConfigsModel } from '../models/configs'

export interface UpdateConfigsModel {
  id: number
  userId: number
  language?: string
  tempUnit?: string
  weightUnit?: string
  theme?: string
}

export interface UpdateConfigs {
  updateConfigs(configs: UpdateConfigsModel): Promise<ConfigsModel>
}
