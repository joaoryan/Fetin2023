import { UserModel } from '../../../domain/models/user'
import { LoadUserByCorporateName } from '../../../domain/usecases/load-user-by-corporateName'
import { LoadUserByCorporateNameRepository } from '../../protocols/db/user/load-user-by-corporateName-repository'

export class DbLoadUserByCorporateName implements LoadUserByCorporateName {
  private readonly loadUserByCorporateNameRepository: LoadUserByCorporateNameRepository
  constructor (loadUserByCorporateNameRepository: LoadUserByCorporateNameRepository) {
    this.loadUserByCorporateNameRepository = loadUserByCorporateNameRepository
  }

  async loadUser (corporateName: string): Promise<UserModel> {
    return this.loadUserByCorporateNameRepository.loadUserByCorporateName(corporateName)
  }
}
