import { UserModel } from '../models/user'

export interface LoadUserByCorporateName {
  loadUser(corporateName: string): Promise<UserModel | null>
}
