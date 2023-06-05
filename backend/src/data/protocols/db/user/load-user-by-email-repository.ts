import { UserModel } from '../../../usecases/add-user/db-add-user-protocols'

export interface LoadUserByEmailRepository {
  loadByEmail (email: string): Promise<UserModel | null>
}
