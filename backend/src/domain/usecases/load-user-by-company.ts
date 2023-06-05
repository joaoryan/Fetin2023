import { UserModel } from '../models/user'

export interface LoadUserByCompany {
  loadUser(id: number): Promise<UserModel[] | null>
}
