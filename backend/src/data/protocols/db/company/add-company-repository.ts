import { AddCompanyModel } from '../../../../domain/usecases/add-company'
import { CompanyModel } from '../../../../domain/models/company'

export interface AddCompanyRepository {
    add (companyData: AddCompanyModel): Promise<CompanyModel>
}
