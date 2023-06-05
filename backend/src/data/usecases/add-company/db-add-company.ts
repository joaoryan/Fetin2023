import { CompanyModel } from '../../../domain/models/company'
import { AddCompany, AddCompanyModel } from '../../../domain/usecases/add-company'
import { AddCompanyRepository, LoadCompanyByCorporateNameRepository } from './db-add-company-protocols'

export class DbAddCompany implements AddCompany {
  private readonly addCompanyRepository: AddCompanyRepository
  private readonly loadCompanyByCorporateNameRepository: LoadCompanyByCorporateNameRepository

  constructor (addCompanyRepository: AddCompanyRepository, loadCompanyByCorporateNameRepository: LoadCompanyByCorporateNameRepository) {
    this.addCompanyRepository = addCompanyRepository
    this.loadCompanyByCorporateNameRepository = loadCompanyByCorporateNameRepository
  }

  async add (companyData: AddCompanyModel): Promise<CompanyModel> {
    const company = await this.loadCompanyByCorporateNameRepository.loadByCorporateName(companyData.corporateName)
    if (!company) {
      const newCompany = await this.addCompanyRepository.add(companyData)
      return newCompany
    }
    return null
  }
}
