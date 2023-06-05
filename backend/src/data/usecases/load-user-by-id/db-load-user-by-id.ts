import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { LoadUserByIdRepository } from '../../protocols/db/user/load-user-by-id-repository'
import { UserModel } from '../add-user/db-add-user-protocols'

export class DbLoadUserById implements LoadUserById {
  private readonly loadUserByIdRepository: LoadUserByIdRepository

  constructor (loadUserByIdRepository: LoadUserByIdRepository) {
    this.loadUserByIdRepository = loadUserByIdRepository
  }

  async load (id: number): Promise<UserModel> {
    const user = await this.loadUserByIdRepository.loadById(id)
    if (user) {
      return user
    }
    return null
  }
}
