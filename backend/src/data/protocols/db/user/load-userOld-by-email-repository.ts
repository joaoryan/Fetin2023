import { UserOldModel } from '../../../../domain/models/userOld'

export interface LoadUserOldByEmailRepository {
  loadUserOldByEmail(email: string): Promise<UserOldModel | null>
}
