import { OvenModels } from '../models/oven-models'
export interface DownloadUpdate {
  load (ovenModel: OvenModels): Promise<DownloadUpdate.Response>
}

// eslint-disable-next-line no-redeclare
export namespace DownloadUpdate {
  export type Response = string
  export type Request = {
    params: {
      ovenModel: OvenModels
    }
  }
}
