import { LoadEquipById } from '../../../../domain/usecases/load-equip-by-id'

export interface LoadEquipByIdRepository {
  loadEquipById: (Id: number) => Promise<LoadEquipByIdRepository.Result>
}

// eslint-disable-next-line no-redeclare
export namespace LoadEquipByIdRepository {
  export type Result = LoadEquipById.Response
}
