import {
  Authentication,
  AuthenticationModel,
  LoadUserByEmailRepository,
  HashComparer,
  Encrypter,
  UserModel,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly encrypter: Encrypter
  private readonly UpdateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadUserByEmailRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
    UpdateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadUserByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = encrypter
    this.UpdateAccessTokenRepository = UpdateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel) {
    const account: UserModel = await this.loadUserByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isAuthed = await this.hashComparer.compare(authentication.password, account.password)
      if (isAuthed) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.UpdateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
      return null
    }
    return null
  }
}
