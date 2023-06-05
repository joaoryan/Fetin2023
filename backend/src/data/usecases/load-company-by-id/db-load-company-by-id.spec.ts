/* eslint-disable no-undef */
import { DbLoadCompanyById } from './db-load-company-by-id'
import { LoadCompanyByIdRepository } from '../../protocols/db/company/load-company-by-id-repository'
import { CompanyModel } from '../add-company/db-add-company-protocols'

const makeFakeCompany = (): CompanyModel => ({
  id: 1,
  corporateName: 'valid_name',
  companyType: 1
})

const makeLoadCompanyByTokenRepository = (): LoadCompanyByIdRepository => {
  class LoadUsertByIdRepositoryStub implements LoadCompanyByIdRepository {
    async loadById (id: number): Promise<CompanyModel | null> {
      return new Promise(resolve => resolve(makeFakeCompany()))
    }
  }
  return new LoadUsertByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadCompanyById
  loadUserByIdRepositoryStub: LoadCompanyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = makeLoadCompanyByTokenRepository()
  const sut = new DbLoadCompanyById(loadUserByIdRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub
  }
}

describe('DbVerifyToken usecase', () => {
  test('Should call LoadCompanyByIdRepository with correct values', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.load(1)
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should return null if LoadCompanyByIdRepository returns null', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load(1)
    expect(account).toBeNull()
  })

  test('Should throw if LoadCompanyByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load(1)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a company on success', async () => {
    const { sut } = makeSut()
    const company = await sut.load(1)
    expect(company).toEqual(makeFakeCompany())
  })
})
