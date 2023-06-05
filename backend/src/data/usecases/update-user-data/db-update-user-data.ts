import { Hasher, EditUserData, EditUserDataModel, UserModel, EditUserDataRepository, LoadUserByIdRepository } from './db-update-user-data-protocols'

export class DbEditUserData implements EditUserData {
  private readonly hasher: Hasher
  private readonly editUserDataRepository: EditUserDataRepository
  private readonly loadUserByIdRepository: LoadUserByIdRepository

  constructor (hasher: Hasher, editUserDataRepository: EditUserDataRepository, loadUserByIdRepository: LoadUserByIdRepository) {
    this.hasher = hasher
    this.editUserDataRepository = editUserDataRepository
    this.loadUserByIdRepository = loadUserByIdRepository
  }

  async editUserData (user: EditUserDataModel): Promise<UserModel> {
    let hashedPassword: any
    console.log(user)
    if (user.password) {
      hashedPassword = await this.hasher.hash(user.password)
      await this.editUserDataRepository.editUserData(Object.assign({}, user, { password: hashedPassword }))
    } else {
      await this.editUserDataRepository.editUserData(user)
    }
    const userResult = await this.loadUserByIdRepository.loadById(user.id)
    if (userResult) {
      return userResult
    }
    return null
  }
}
