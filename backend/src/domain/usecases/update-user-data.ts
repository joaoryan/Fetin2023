import { UserModel } from '../models/user'

export interface EditUserDataModel {
  id: number,
  userName?: string,
  email?: string,
  emailVerified?: boolean,
  companyId?: number,
  phone?: string,
  password?: string,
  creationDate?: string,
  userTypeId?: string,
  activateToken?: string
}

export interface EditUserData {
  editUserData(user: EditUserDataModel): Promise<UserModel>
}
