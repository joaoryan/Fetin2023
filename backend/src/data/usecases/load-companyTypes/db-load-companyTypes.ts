import { CompanyTypesModel } from '../../../domain/models/companyTypes'
import { LoadCompanyTypes } from '../../../domain/usecases/load-companyTypes'
import { LoadCompanyTypesRepository } from '../../protocols/db/companyTypes/load-companyTypes-repository'

export class DbLoadCompanyTypes implements LoadCompanyTypes {
  private readonly loadCompanyTypesRepository: LoadCompanyTypesRepository

  constructor (loadCompanyTypesRepository: LoadCompanyTypesRepository) {
    this.loadCompanyTypesRepository = loadCompanyTypesRepository
  }

  async load (): Promise<CompanyTypesModel[]> {
    const companyTypes: CompanyTypesModel[] = await this.loadCompanyTypesRepository.load()
    return companyTypes
  }
}
