import { AddUserModel } from '../../../../domain/usecases/add-user'
import { UserModel } from '../../../../domain/models/user'

export const mapCreatedUser = (addedAccount: AddUserModel, addedAccountId: number): UserModel => {
  return Object.assign({}, addedAccount, { id: addedAccountId })
}
