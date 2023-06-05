import { CompanyModel } from '../models/company'

export interface AddCompanyModel {
  corporateName: string
  companyType: number
}

export interface AddCompany {
  add (company : AddCompanyModel): Promise<CompanyModel | null>
}
