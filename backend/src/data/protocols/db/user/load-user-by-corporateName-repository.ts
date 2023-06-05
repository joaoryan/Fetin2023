import { UserModel } from '../../../../domain/models/user'

export interface LoadUserByCorporateNameRepository {
  loadUserByCorporateName(corporateName: string): Promise<UserModel | null>
}
