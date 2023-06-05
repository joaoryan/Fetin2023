import { LoadCompanyById } from '../../../domain/usecases/load-company-by-id'
import { LoadCompanyByIdRepository } from '../../protocols/db/company/load-company-by-id-repository'
import { CompanyModel } from '../add-company/db-add-company-protocols'

export class DbLoadCompanyById implements LoadCompanyById {
  private readonly loadCompanyByIdRepository: LoadCompanyByIdRepository

  constructor (loadCompanyByIdRepository: LoadCompanyByIdRepository) {
    this.loadCompanyByIdRepository = loadCompanyByIdRepository
  }

  async load (id: number): Promise<CompanyModel> {
    const company = await this.loadCompanyByIdRepository.loadById(id)
    if (company) {
      return company
    }
    return null
  }
}
