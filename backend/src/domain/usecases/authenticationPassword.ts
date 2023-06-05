export interface AuthenticationModel {
  email: string,
  password: string
}

export interface AuthenticationPassword {
  auth(authentication: AuthenticationModel): Promise<boolean>
}
