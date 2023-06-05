/* eslint-disable no-undef */
import { UserModel } from '../add-user/db-add-user-protocols'
import { LoadUserByActivationRepository, UpdateActivateTokenRepository } from './db-Update-user-by-activation-protocols'
import { DbUpdateUserByActivation } from './db-Update-user-by-activation'
import { getOne } from '../../../infra/db/mysql/mysql-helper'
import { connection } from '../../../main/config/app'
import mysql from 'mysql'
import env from '../../../main/config/env'
import { mockInsertUser, mockReturnUser } from '../../../domain/mocks/user'

const makeLoadUserByActivationStub = (): LoadUserByActivationRepository => {
  class LoadUserByActivationRepositoryStub implements LoadUserByActivationRepository {
    async loadByActivation (activateToken: string): Promise<UserModel> {
      return new Promise<UserModel>(resolve => resolve(mockReturnUser()))
    }
  }
  return new LoadUserByActivationRepositoryStub()
}

const makeUpdateActivateTokenRepositoryStub = (): UpdateActivateTokenRepository => {
  class UpdateActivateTokenRepositoryStub implements UpdateActivateTokenRepository {
    updateActivateToken (id: number, emailVerified: boolean): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateActivateTokenRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateUserByActivation
  loadUserByActivationStub: LoadUserByActivationRepository
  UpdateActivateTokenStub: UpdateActivateTokenRepository
}

const makeSut = (): SutTypes => {
  const loadUserByActivationStub = makeLoadUserByActivationStub()
  const UpdateActivateTokenStub = makeUpdateActivateTokenRepositoryStub()
  const sut = new DbUpdateUserByActivation(loadUserByActivationStub, UpdateActivateTokenStub)
  return {
    sut,
    loadUserByActivationStub,
    UpdateActivateTokenStub
  }
}

describe('DbUpdateUserByActivation', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })
  const testConnection = mysql.createPool(env.dbTest)

  test('Should call loadUserByActivationStub and UpdateActivateTokenStub', async () => {
    await mockInsertUser()
    const { sut, loadUserByActivationStub, UpdateActivateTokenStub } = makeSut()
    jest.spyOn(sut, 'updateActivationCode')
    const loadSpy = jest.spyOn(loadUserByActivationStub, 'loadByActivation')
    const UpdateSpy = jest.spyOn(UpdateActivateTokenStub, 'updateActivateToken')

    await sut.updateActivationCode('pinData')
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(UpdateSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith('pinData')
  })

  test('Should call UpdateActivationCode', async () => {
    const result = await mockInsertUser()
    const { sut } = makeSut()
    jest.spyOn(sut, 'updateActivationCode')
    await sut.updateActivationCode('pinData')
    const User = await getOne(testConnection, 'User', 'id', result.idUser)
    expect(User).toBeTruthy()
    expect(User[0].emailVerified).toBe(1)
  })
})
