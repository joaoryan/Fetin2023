import { EquipModel } from '../../../../domain/models/equipment'

export interface LoadEquipByPinRepository {
    loadByEquipPin (IOKPin: String): Promise<EquipModel | null>
}
