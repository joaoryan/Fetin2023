import { LoadEquipByCompanyId } from '../../../domain/usecases/load-equip-by-company-id'
import { LoadEquipByCompanyIdRepository } from '../../protocols/db/equipment/load-equip-by-company-id-repository'
import { LoadEquipByUserIdRepository } from '../../protocols/db/equipment/load-equip-by-user-id-repository'

export class DbLoadEquipByCompanyId implements LoadEquipByCompanyId {
  private readonly repository: LoadEquipByCompanyIdRepository
  private readonly loadEquipByUserIdRepository: LoadEquipByUserIdRepository
  constructor (repository: LoadEquipByCompanyIdRepository, loadEquipByUserIdRepository: LoadEquipByUserIdRepository) {
    this.repository = repository
    this.loadEquipByUserIdRepository = loadEquipByUserIdRepository
  }

  async load (companyId: number, userId: number, userPrivilegeUser: string): Promise<LoadEquipByCompanyIdRepository.Result> {
    if (userPrivilegeUser === 'admCli') {
      return this.repository.loadEquipByCompanyId(companyId)
    } else {
      return this.loadEquipByUserIdRepository.loadEquipByUserId(userId)
    }
  }
}
