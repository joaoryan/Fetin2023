import { PermissionTypesModel } from '../models/permissionTypes'

export interface LoadPermissionTypes {
  load (id: number): Promise<PermissionTypesModel | null>
}
