import { MenuGroupModel } from '../../../../domain/models/menu-group'

export interface LoadGroupRepository {
    loadGroup(id: number): Promise<MenuGroupModel>
}
