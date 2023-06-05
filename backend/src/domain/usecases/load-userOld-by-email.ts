import { UserOldModel } from '../models/userOld'

export interface LoadUserOldByEmail {
  loadUser(email: string): Promise<UserOldModel | null>
}
