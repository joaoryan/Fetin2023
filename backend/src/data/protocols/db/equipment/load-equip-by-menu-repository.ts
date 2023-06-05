import { EquipModel } from '../../../../domain/models/equipment'

export interface LoadEquipByMenuRepository {
    loadByEquipMenu (menuId: number): Promise<EquipModel[]>
}
