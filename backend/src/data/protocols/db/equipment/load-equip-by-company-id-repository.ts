import { LoadEquipByCompanyId } from '../../../../domain/usecases/load-equip-by-company-id'

export interface LoadEquipByCompanyIdRepository {
  loadEquipByCompanyId: (companyId: number) => Promise<LoadEquipByCompanyIdRepository.Result>
}

// eslint-disable-next-line no-redeclare
export namespace LoadEquipByCompanyIdRepository {
  export type Result = LoadEquipByCompanyId.Response[]
}
