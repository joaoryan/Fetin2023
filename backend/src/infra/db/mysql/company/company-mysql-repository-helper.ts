import { CompanyModel } from '../../../../domain/models/company'
import { AddCompanyModel } from '../../../../domain/usecases/add-company'

export const mapCreatedCompany = (addedCompany: AddCompanyModel, addedCompanyId: number): CompanyModel => {
  return Object.assign({}, addedCompany, { id: addedCompanyId })
}
