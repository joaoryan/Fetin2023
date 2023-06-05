interface itemOption {
  value: number
  label: string
}
export interface UserModel {
  id?: number
  userName: string
  email: string
  emailVerified: boolean
  companyId: number
  phone: string
  password: string
  creationDate: string
  userTypeId: string
  activateToken: string
  accessToken?: string
  stores?: itemOption[]
}

export interface UserUpdateModel {
  id: number
  userName: string
  email: string
  emailVerified: boolean
  companyId: number
  phone: string
  password: string
  creationDate: string
  userTypeId: string
  activateToken: string
}
