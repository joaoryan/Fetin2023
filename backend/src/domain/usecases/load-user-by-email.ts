import { UserModel } from '../models/user'

export interface LoadUserByEmail {
  loadUser(email: string): Promise<UserModel | null>
}
