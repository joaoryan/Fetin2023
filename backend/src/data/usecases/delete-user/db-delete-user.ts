import { DeleteUser } from '../../../domain/usecases/delete-user'
import { DeleteUserRepository } from '../../protocols/db/user/delete-user-repository'

export class DbDeleteUser implements DeleteUser {
  private readonly repository: DeleteUserRepository
  constructor (repository: DeleteUserRepository) {
    this.repository = repository
  }

  async deleteUser (id: number): Promise<boolean> {
    return await this.repository.deleteUser(id)
  }
}
