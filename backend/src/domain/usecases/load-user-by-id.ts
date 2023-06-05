import { UserModel } from '../models/user'

export interface LoadUserById {
  load (id: number): Promise<UserModel | null>
}
