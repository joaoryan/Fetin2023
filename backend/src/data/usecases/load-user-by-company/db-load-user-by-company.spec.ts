/* eslint-disable no-undef */
import { DbLoadUserByCompany } from './db-load-user-by-Company'
import { LoadUserByCompanyRepository } from '../../protocols/db/user/load-user-by-company-repository'
import { UserModel } from '../add-user/db-add-user-protocols'
import { LoadStoresByUserRepository } from '../../protocols/db/store/load-stores-by-user-repository'
import { StoreModel } from '../add-store/db-add-store-protocols'
import { mockLoadStoreByIdResponse } from '../../../domain/mocks/store'
import { mockReturnUserStore } from '../../../domain/mocks/user'

class LoadUserByCompanyRepositoryStub implements LoadUserByCompanyRepository {
  async loadByCompany (id: number): Promise<UserModel[] | null> {
    return new Promise(resolve => resolve([mockReturnUserStore()]))
  }
}

class LoadStoresByUserRepositoryStub implements LoadStoresByUserRepository {
  async loadStoresByUser (idUser: number): Promise<StoreModel[] | null> {
    return new Promise(resolve => resolve([mockLoadStoreByIdResponse()]))
  }
}

interface SutTypes {
  sut: DbLoadUserByCompany
  loadUserByCompanyRepositoryStub: LoadUserByCompanyRepository
  loadStoresByUserRepositoryStub: LoadStoresByUserRepository
}

const makeSut = (): SutTypes => {
  const loadUserByCompanyRepositoryStub = new LoadUserByCompanyRepositoryStub()
  const loadStoresByUserRepositoryStub = new LoadStoresByUserRepositoryStub()
  const sut = new DbLoadUserByCompany(loadUserByCompanyRepositoryStub, loadStoresByUserRepositoryStub)
  return {
    sut,
    loadUserByCompanyRepositoryStub,
    loadStoresByUserRepositoryStub
  }
}

describe('DbLoadUserByCompany usecase', () => {
  test('Should call LoadUserByCompany with correct values', async () => {
    const { sut, loadUserByCompanyRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByCompanyRepositoryStub, 'loadByCompany')
    await sut.loadUser(1)
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should return null if LoadUserByCompany returns null', async () => {
    const { sut, loadUserByCompanyRepositoryStub } = makeSut()
    jest.spyOn(loadUserByCompanyRepositoryStub, 'loadByCompany').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const store = await sut.loadUser(1)
    expect(store).toBeNull()
  })

  test('Should throw if LoadUserByCompanyRepository throws', async () => {
    const { sut, loadUserByCompanyRepositoryStub } = makeSut()
    jest.spyOn(loadUserByCompanyRepositoryStub, 'loadByCompany').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadUser(1)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a user on success', async () => {
    const { sut } = makeSut()
    const store = await sut.loadUser(1)
    expect(store).toEqual([mockReturnUserStore()])
  })
})
