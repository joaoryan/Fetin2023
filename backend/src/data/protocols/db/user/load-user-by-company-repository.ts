import { UserModel } from '../../../usecases/add-user/db-add-user-protocols'

export interface LoadUserByCompanyRepository {
  loadByCompany(id: number): Promise<UserModel[] | null>
}
