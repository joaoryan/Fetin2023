import { LoadUserByCompany } from '../../../domain/usecases/load-user-by-company'
import { LoadStoresByUserRepository } from '../../protocols/db/store/load-stores-by-user-repository'
import { LoadUserByCompanyRepository } from '../../protocols/db/user/load-user-by-company-repository'
import { StoreModel } from '../add-store/db-add-store-protocols'
import { UserModel } from '../add-user/db-add-user-protocols'

export class DbLoadUserByCompany implements LoadUserByCompany {
  private readonly loadUserByCompanyRepository: LoadUserByCompanyRepository
  private readonly loadStoresByUserRepository: LoadStoresByUserRepository

  constructor (loadUserByCompanyRepository: LoadUserByCompanyRepository, loadStoresByUserRepository: LoadStoresByUserRepository) {
    this.loadUserByCompanyRepository = loadUserByCompanyRepository
    this.loadStoresByUserRepository = loadStoresByUserRepository
  }

  async loadUser (id: number): Promise<UserModel[]> {
    const users = await this.loadUserByCompanyRepository.loadByCompany(id)
    if (users) {
      for (const user of users) {
        const store = await this.loadStoresByUserRepository.loadStoresByUser(user.id)
        const storeOption = store.map((store: StoreModel) => ({ value: store.id, label: store.storeName }))
        Object.assign(user, { stores: storeOption })
      }
      return users
    }
    return null
  }
}
