/* eslint-disable no-undef */
import { CompanyMySqlRepository } from './company-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { getOne, insertOne } from '../mysql-helper'
import { AddCompanyModel } from '../../../../domain/usecases/add-company'

const makeFakeAddCompanyData = (): AddCompanyModel => ({
  corporateName: 'valid_name',
  companyType: 1
})

describe('Company Mysql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new CompanyMySqlRepository(testConnection)

  test('Should create a company on add success', async () => {
    await sut.add(makeFakeAddCompanyData())
    const created = await getOne(testConnection, 'company', 'corporateName', 'valid_name')
    expect(created[0]).toBeTruthy()
    expect(created[0].id).toBeTruthy()
    expect(created[0].corporateName).toBe('valid_name')
    expect(created[0].companyType).toEqual(1)
  })

  test('Should return a company on loadByCorporateName success', async () => {
    await insertOne(testConnection, 'company', {
      corporateName: 'valid_name',
      companyType: 1
    })

    const loadedCompany = await sut.loadByCorporateName('valid_name')
    expect(loadedCompany).toBeTruthy()
    expect(loadedCompany.id).toBeTruthy()
    expect(loadedCompany.corporateName).toBe('valid_name')
    expect(loadedCompany.companyType).toEqual(1)
  })

  test('Should return null if loadByCorporateName fails', async () => {
    const loadedAccount = await sut.loadByCorporateName('invalid_mail@email.com')
    expect(loadedAccount).toBeFalsy()
  })

  test('Should return a company on loadById success', async () => {
    const insertedCompany = await insertOne(testConnection, 'company', {
      corporateName: 'valid_name',
      companyType: 1
    })

    const loadedCompany = await sut.loadById(insertedCompany.insertId)
    expect(loadedCompany).toBeTruthy()
    expect(loadedCompany.id).toBeTruthy()
    expect(loadedCompany.corporateName).toBe('valid_name')
    expect(loadedCompany.companyType).toEqual(1)
  })

  test('Should return null if loadByCorporateName fails', async () => {
    const loadedAccount = await sut.loadById(9999)
    expect(loadedAccount).toBeFalsy()
  })
})
