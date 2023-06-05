import { UserModel } from '../../../usecases/add-user/db-add-user-protocols'

export interface LoadUserByTokenRepository {
  loadByToken (token: string, role?:string): Promise<UserModel | null>
}
