import { OvenModels } from '../models/oven-models'
export interface UpdateSoftware {
  load (ovenModel: OvenModels, iokPin: string): Promise<UpdateSoftware.Response>
}

// eslint-disable-next-line no-redeclare
export namespace UpdateSoftware {
  export type Response = string
  export type Request = {
    params: {
      ovenModel: OvenModels
      iokPin: string
    }
  }
}
