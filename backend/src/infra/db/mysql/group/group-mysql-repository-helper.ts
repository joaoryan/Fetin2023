import { AddGroupModel } from '../../../../domain/usecases/add-group'
import { MenuGroupModel } from '../../../../domain/models/menu-group'

export const mapCreatedGroup = (addedAccount: AddGroupModel, addedAccountId: number): MenuGroupModel => {
  return Object.assign({}, addedAccount, { id: addedAccountId })
}
