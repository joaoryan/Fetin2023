import { UserTypesModel } from '../../../../domain/models/userTypes'

export interface LoadUserTypesRepository {
  loadByCompanyTypeId(companyTypeId: number): Promise<UserTypesModel[]>
}
