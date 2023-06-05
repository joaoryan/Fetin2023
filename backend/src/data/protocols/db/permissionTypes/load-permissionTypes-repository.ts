import { PermissionTypesModel } from '../../../../domain/models/permissionTypes'

export interface LoadPermissionTypesRepository {
  loadById(id: number): Promise<PermissionTypesModel | null>
}
