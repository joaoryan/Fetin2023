import { LoadUserByEmailRepository } from '../authentication/db-authentication-protocols'
import { AddUser, AddUserModel, UserModel, Hasher, AddUserRepository, CreateCodeRandom } from './db-add-user-protocols'

export class DbAddUser implements AddUser {
  private readonly hasher: Hasher
  private readonly addUserRepository: AddUserRepository
  private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  private readonly codeRandomRepository: CreateCodeRandom

  constructor (hasher: Hasher, addUserRepository: AddUserRepository, loadUserByEmailRepository: LoadUserByEmailRepository, codeRandomRepository: CreateCodeRandom) {
    this.hasher = hasher
    this.addUserRepository = addUserRepository
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.codeRandomRepository = codeRandomRepository
  }

  async add (userData: AddUserModel): Promise<UserModel> {
    const user = await this.loadUserByEmailRepository.loadByEmail(userData.email)
    if (!user) {
      const hashedPassword = await this.hasher.hash(userData.password)
      const codeActivation = await this.codeRandomRepository.codeRandom()
      const newUser = await this.addUserRepository.add(Object.assign({}, userData, { password: hashedPassword, activateToken: codeActivation }))
      return newUser
    }
    return null
  }
}
