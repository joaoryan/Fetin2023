import { LoadEquipByCompanyId } from '../../../../domain/usecases/load-equip-by-company-id'

export interface LoadEquipByUserIdRepository {
  loadEquipByUserId(userId: number): Promise<LoadEquipByUserIdRepository.Result>
}

// eslint-disable-next-line no-redeclare
export namespace LoadEquipByUserIdRepository {
  export type Result = LoadEquipByCompanyId.Response[]
}
