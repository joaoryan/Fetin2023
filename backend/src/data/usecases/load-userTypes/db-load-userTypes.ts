import { UserTypesModel } from '../../../domain/models/userTypes'
import { LoadUserTypes } from '../../../domain/usecases/load-userTypes'
import { LoadUserTypesRepository } from '../../protocols/db/userTypes/load-userTypes-repository'

export class DbLoadUserTypes implements LoadUserTypes {
  private readonly loadUserTypesRepository: LoadUserTypesRepository

  constructor (loadUserTypesRepository: LoadUserTypesRepository) {
    this.loadUserTypesRepository = loadUserTypesRepository
  }

  async loadByCompanyTypeId (companyTypeId: number): Promise<UserTypesModel[]> {
    const userTypes: UserTypesModel[] = await this.loadUserTypesRepository.loadByCompanyTypeId(companyTypeId)
    return userTypes
  }
}
