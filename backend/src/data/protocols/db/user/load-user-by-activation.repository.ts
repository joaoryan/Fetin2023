import { UserModel } from '../../../usecases/add-user/db-add-user-protocols'

export interface LoadUserByActivationRepository {
  loadByActivation (activateToken: string): Promise<UserModel>
}
