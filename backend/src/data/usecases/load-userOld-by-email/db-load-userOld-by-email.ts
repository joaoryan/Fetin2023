import { UserOldModel } from '../../../domain/models/userOld'
import { LoadUserOldByEmail } from '../../../domain/usecases/load-userOld-by-email'
import { LoadUserOldByEmailRepository } from '../../protocols/db/user/load-userOld-by-email-repository'

export class DbLoadUserOldByEmail implements LoadUserOldByEmail {
  private readonly loadUserByEmailRepository: LoadUserOldByEmailRepository
  constructor (loadAccountByEmailRepository: LoadUserOldByEmailRepository) {
    this.loadUserByEmailRepository = loadAccountByEmailRepository
  }

  async loadUser (email: string): Promise<UserOldModel> {
    return this.loadUserByEmailRepository.loadUserOldByEmail(email)
  }
}
