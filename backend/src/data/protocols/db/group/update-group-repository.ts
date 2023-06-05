import { MenuGroupModel } from '../../../../domain/models/menu-group'
import { UpdateGroupModel } from '../../../../domain/usecases/Update-group'

export interface UpdateGroupRepository {
    updateGroup(groupData: UpdateGroupModel): Promise<MenuGroupModel>
}
