import { ConfigsModel } from '../models/configs'

export interface AddConfigsModel {
  userId: number
  language: string
  tempUnit: string
  weightUnit: string
  theme: string
}

export interface AddConfigs {
  add (configs : AddConfigsModel): Promise<ConfigsModel | null>
}
