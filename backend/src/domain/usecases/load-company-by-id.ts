import { CompanyModel } from '../models/company'

export interface LoadCompanyById {
  load (id: number): Promise<CompanyModel | null>
}
