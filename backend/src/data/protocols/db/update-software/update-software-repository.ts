import { OvenModels } from '../../../../domain/models/oven-models'
import { UpdateSoftware } from '../../../../domain/usecases/update-software'

export interface UpdateSoftwareRepository {
  updateSoftware: (ovenModel: UpdateSoftwareRepository.Params, iokPin: string) => Promise<UpdateSoftwareRepository.Result>
}

// eslint-disable-next-line no-redeclare
export namespace UpdateSoftwareRepository {
  export type Params = OvenModels
  export type Result = UpdateSoftware.Response
}
