import { CompanyModel } from '../../../usecases/add-company/db-add-company-protocols'

export interface LoadCompanyByCorporateNameRepository {
  loadByCorporateName (corporateName: string): Promise<CompanyModel | null>
}
