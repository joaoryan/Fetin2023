import { LoadUserByEmail } from '../../../domain/usecases/load-user-by-email'
import { LoadUserByEmailRepository } from '../../protocols/db/user/load-user-by-email-repository'
import { UserModel } from '../add-user/db-add-user-protocols'

export class DbLoadUserByEmail implements LoadUserByEmail {
  private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  constructor (loadAccountByEmailRepository: LoadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadAccountByEmailRepository
  }

  async loadUser (email: string): Promise<UserModel> {
    return this.loadUserByEmailRepository.loadByEmail(email)
  }
}
