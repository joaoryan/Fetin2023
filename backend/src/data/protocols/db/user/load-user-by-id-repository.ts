import { UserModel } from '../../../usecases/add-user/db-add-user-protocols'

export interface LoadUserByIdRepository {
  loadById(id: number): Promise<UserModel | null>
}
