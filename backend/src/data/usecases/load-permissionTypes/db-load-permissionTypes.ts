import { PermissionTypesModel } from '../../../domain/models/permissionTypes'
import { LoadPermissionTypes } from '../../../domain/usecases/load-permissionTypes'
import { LoadPermissionTypesRepository } from '../../protocols/db/permissionTypes/load-permissionTypes-repository'

export class DbLoadPermissionTypes implements LoadPermissionTypes {
  private readonly loadPermissionTypesRepository: LoadPermissionTypesRepository

  constructor (loadPermissionTypesRepository: LoadPermissionTypesRepository) {
    this.loadPermissionTypesRepository = loadPermissionTypesRepository
  }

  async load (id: number): Promise<PermissionTypesModel> {
    const permissionTypes = await this.loadPermissionTypesRepository.loadById(id)
    return permissionTypes
  }
}
