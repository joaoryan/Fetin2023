import { CompanyTypesModel } from '../models/companyTypes'

export interface LoadCompanyTypes {
  load (): Promise<CompanyTypesModel[] | null>
}
