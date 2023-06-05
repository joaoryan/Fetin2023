import { CompanyModel } from '../../../usecases/add-company/db-add-company-protocols'

export interface LoadCompanyByIdRepository {
  loadById(id: number): Promise<CompanyModel | null>
}
