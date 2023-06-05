import { CompanyTypesModel } from '../../../../domain/models/companyTypes'

export interface LoadCompanyTypesRepository {
  load(): Promise<CompanyTypesModel[]>
}
