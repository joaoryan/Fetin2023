import { UserTypesModel } from '../models/userTypes'

export interface LoadUserTypes {
  loadByCompanyTypeId (companyTypeId: number): Promise<UserTypesModel[] | null>
}
