/* eslint-disable no-undef */
import { CompanyModel } from '../../../domain/models/company'
import { connection } from '../../../main/config/app'
import env from '../../../main/config/env'
import { DbAddCompany } from './db-add-company'
import { AddCompanyModel, AddCompanyRepository, LoadCompanyByCorporateNameRepository } from './db-add-company-protocols'
import mysql from 'mysql'
import { insertOne } from '../../../infra/db/mysql/mysql-helper'

const makeFakeAddCompanyData = (): AddCompanyModel => ({
  corporateName: 'valid_name',
  companyType: 1
})

const makeFakeCompany = (): CompanyModel => ({
  id: 1,
  corporateName: 'valid_name',
  companyType: 1
})

const makeAddMenuRepository = (): AddCompanyRepository => {
  class AddCompanyRepositoryStub implements AddCompanyRepository {
    async add (menuData: AddCompanyModel): Promise<CompanyModel> {
      return new Promise(resolve => resolve(makeFakeCompany()))
    }
  }

  return new AddCompanyRepositoryStub()
}

const makeLoadCompanyByCorporateNameRepository = (): LoadCompanyByCorporateNameRepository => {
  class LoadCompanyByCorporateNameRepositoryStub implements LoadCompanyByCorporateNameRepository {
    async loadByCorporateName (corporateName: string): Promise<CompanyModel | null> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new LoadCompanyByCorporateNameRepositoryStub()
}

interface SutTypes {
  sut: DbAddCompany
  addCompanyRepositoryStub: AddCompanyRepository
  loadCompanyByCorporateNameRepositoryStub: LoadCompanyByCorporateNameRepository
}

const makeSut = (): SutTypes => {
  const loadCompanyByCorporateNameRepositoryStub = makeLoadCompanyByCorporateNameRepository()
  const addCompanyRepositoryStub = makeAddMenuRepository()
  const sut = new DbAddCompany(addCompanyRepositoryStub, loadCompanyByCorporateNameRepositoryStub)
  return {
    sut,
    addCompanyRepositoryStub,
    loadCompanyByCorporateNameRepositoryStub
  }
}

describe('DbAddCompany Usecase', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)

  test('Should call AddCompanyRepository with correct values', async () => {
    await insertOne(testConnection, 'equipment', {
      name: 'name',
      typeEquipment: 'typeEquipment',
      idUser: 1,
      dataUpdate: true,
      statusData: 'statusData',
      appUpdate: true,
      statusApp: 'statusApp',
      serialNumber: 'serialNumber',
      menuId: 1,
      sentMenu: 1,
      iokPin: 'iokPin',
      creationDate: 'creationDate',
      softwareVersion: 'softwareVersion',
      hashSw: 'hashSw'
    })
    const { sut, addCompanyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCompanyRepositoryStub, 'add')
    await sut.add(makeFakeAddCompanyData())
    expect(addSpy).toHaveBeenCalledWith({
      corporateName: 'valid_name',
      companyType: 1
    })
  })

  test('Should throw if AddCompanyRepository thows', async () => {
    const { sut, addCompanyRepositoryStub } = makeSut()
    jest.spyOn(addCompanyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAddCompanyData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadCompanyByCorporateNameRepository with correct values', async () => {
    const { sut, loadCompanyByCorporateNameRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCompanyByCorporateNameRepositoryStub, 'loadByCorporateName')
    await sut.add(makeFakeAddCompanyData())
    expect(loadSpy).toHaveBeenCalledWith('valid_name')
  })

  test('Should throw if LoadCompanyByCorporateNameRepository throws', async () => {
    const { sut, loadCompanyByCorporateNameRepositoryStub } = makeSut()
    jest.spyOn(loadCompanyByCorporateNameRepositoryStub, 'loadByCorporateName').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAddCompanyData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadCompanyByCorporateNameRepository returns a company', async () => {
    const { sut, loadCompanyByCorporateNameRepositoryStub } = makeSut()
    jest.spyOn(loadCompanyByCorporateNameRepositoryStub, 'loadByCorporateName').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeCompany())))
    const user = await sut.add(makeFakeAddCompanyData())
    expect(user).toBeNull()
  })

  test('Should return a company on AddCompanyRepository success', async () => {
    await insertOne(testConnection, 'equipment', {
      name: 'name',
      typeEquipment: 'typeEquipment',
      idUser: 1,
      dataUpdate: true,
      statusData: 'statusData',
      appUpdate: true,
      statusApp: 'statusApp',
      serialNumber: 'serialNumber',
      menuId: 1,
      sentMenu: 1,
      iokPin: 'iokPin',
      creationDate: 'creationDate',
      softwareVersion: 'softwareVersion',
      hashSw: 'hashSw'
    })
    const { sut } = makeSut()
    const company = await sut.add(makeFakeAddCompanyData())
    expect(company).toEqual(makeFakeCompany())
  })
})
