import {
  AuthenticationPassword,
  AuthenticationModel,
  LoadUserByEmailRepository,
  HashComparer,
  UserModel
} from './db-authentication-protocols'

export class DbAuthenticationPassword implements AuthenticationPassword {
  private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  private readonly hashComparer: HashComparer

  constructor (
    loadAccountByEmailRepository: LoadUserByEmailRepository,
    hashComparer: HashComparer

  ) {
    this.loadUserByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
  }

  async auth (authentication: AuthenticationModel) {
    const account: UserModel = await this.loadUserByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isAuthed = await this.hashComparer.compare(authentication.password, account.password)
      if (isAuthed) {
        return true
      }
      return false
    }
    return false
  }
}
