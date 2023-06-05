import { UserModel } from '../models/user'

export interface AddUserModel {
  userName: string
  email: string
  emailVerified: boolean
  companyId: number
  phone: string
  password: string
  creationDate: string
  userTypeId: string
  activateToken: string | null
}

export interface AddUser {
  add(account: AddUserModel): Promise<UserModel | null>
}
