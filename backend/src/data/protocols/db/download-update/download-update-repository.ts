import { OvenModels } from '../../../../domain/models/oven-models'
import { DownloadUpdate } from '../../../../domain/usecases/download-update'

export interface DownloadUpdateRepository {
  downloadUpdate: (ovenModel: DownloadUpdateRepository.Params) => Promise<DownloadUpdateRepository.Result>
}

// eslint-disable-next-line no-redeclare
export namespace DownloadUpdateRepository {
  export type Params = OvenModels
  export type Result = DownloadUpdate.Response
}
