import { MenuGroupModel } from '../../../../domain/models/menu-group'
import { AddGroupModel } from '../../../../domain/usecases/add-group'

export interface AddGroupRepository {
    addGroup(groupData: AddGroupModel): Promise<MenuGroupModel>
}
