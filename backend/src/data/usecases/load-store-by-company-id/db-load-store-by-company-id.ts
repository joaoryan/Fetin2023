import { LoadStoresByCompanyId } from '../../../domain/usecases/load-stores-by-company-id'
import { LoadStoresByCompanyIdRepository } from '../../protocols/db/store/load-stores-by-company-id-repository'
import { LoadStoresByUserRepository } from '../../protocols/db/store/load-stores-by-user-repository'
import { StoreModel } from '../add-store/db-add-store-protocols'

export class DbLoadStoresByCompanyId implements LoadStoresByCompanyId {
  private readonly loadStoresByCompanyIdRepository: LoadStoresByCompanyIdRepository
  private readonly loadStoresByUserRepository: LoadStoresByUserRepository

  constructor (loadStoresByCompanyIdRepository: LoadStoresByCompanyIdRepository, loadStoresByUserRepository: LoadStoresByUserRepository) {
    this.loadStoresByCompanyIdRepository = loadStoresByCompanyIdRepository
    this.loadStoresByUserRepository = loadStoresByUserRepository
  }

  async loadStoresByCompanyId (companyId: number, userId: number, userPrivilegeUser: string): Promise<StoreModel[]> {
    let result: StoreModel[] = []
    if (userPrivilegeUser === 'admCli') {
      result = await this.loadStoresByCompanyIdRepository.loadStoresByCompanyId(companyId)
    } else {
      result = await this.loadStoresByUserRepository.loadStoresByUser(userId)
    }
    return result
  }
}
