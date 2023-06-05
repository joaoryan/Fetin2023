/* eslint-disable no-undef */
import { ConfigsMySqlRepository } from './configs-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { getOne } from '../mysql-helper'
import { mockAddUserConfigs, mockInsertUserConfigs } from '../../../../domain/mocks/user'

describe('Company Mysql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new ConfigsMySqlRepository(testConnection)

  test('Should create a user config on add success', async () => {
    const config = await sut.add(await mockAddUserConfigs())
    const created = await getOne(testConnection, 'userConfigs', 'id', config.id)
    expect(created[0]).toBeTruthy()
    expect(created[0].id).toBeTruthy()
    expect(created[0].userId).toBe(config.userId)
    expect(created[0].tempUnit).toBe('°C')
    expect(created[0].weightUnit).toBe('Gramas')
    expect(created[0].theme).toBe('Light')
  })

  test('Should return a config on loadByIdUser success', async () => {
    const config = await mockInsertUserConfigs()
    const loadedConfigs = await sut.loadByUserId(config.idUser)
    expect(loadedConfigs).toBeTruthy()
    expect(loadedConfigs.id).toBeTruthy()
    expect(loadedConfigs.userId).toBe(config.idUser)
    expect(loadedConfigs.tempUnit).toBe('°C')
    expect(loadedConfigs.weightUnit).toBe('Gramas')
    expect(loadedConfigs.theme).toBe('Light')
  })

  test('Should return null if loadByConfigUser fails', async () => {
    const loadedConfigs = await sut.loadByUserId(9999)
    expect(loadedConfigs).toBeFalsy()
  })
})
