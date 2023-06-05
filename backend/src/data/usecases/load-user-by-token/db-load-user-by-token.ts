import { LoadUserByToken } from '../../../domain/usecases/load-user-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadUserByTokenRepository } from '../../protocols/db/user/load-user-by-token-repository'
import { UserModel } from '../add-user/db-add-user-protocols'

export class DbLoadAccountByToken implements LoadUserByToken {
  private readonly decrypter: Decrypter
  private readonly loadUserByTokenRepository: LoadUserByTokenRepository

  constructor (decrypter: Decrypter, loadAccountByTokenRepository: LoadUserByTokenRepository) {
    this.decrypter = decrypter
    this.loadUserByTokenRepository = loadAccountByTokenRepository
  }

  async load (accessToken: string, role?: string): Promise<UserModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadUserByTokenRepository.loadByToken(accessToken, role)
      return account
    }
    return null
  }
}
