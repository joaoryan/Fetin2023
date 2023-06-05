/* eslint-disable no-undef */
import { GroupMySqlRepository } from './group-mysql-repository'
import { connection } from '../../../../main/config/app'
import env from '../../../../main/config/env'
import mysql from 'mysql'
import { getOne } from '../mysql-helper'
import { MenuGroupModel } from '../../../../domain/models/menu-group'
import { mockAddGroup, mockUpdateGroup, mockInsertGroup } from '../../../../domain/mocks/menus'

describe('Group Mysql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new GroupMySqlRepository(testConnection)

  test('Should create a group on success', async () => {
    const groupResult = await mockAddGroup()
    const result = await sut.addGroup(groupResult)
    expect(result).toBeTruthy()
  })

  test('Should Update a group on success', async () => {
    const groupResult = await mockUpdateGroup()
    const result = await sut.updateGroup(groupResult)
    expect(result).toBeTruthy()
  })

  test('Should load a group on success', async () => {
    const groupResult = await mockInsertGroup()
    const result = await sut.loadGroup(groupResult.idGroup)
    expect(result).toBeTruthy()
  })

  test('Should load array group on success', async () => {
    const groupResult = await mockInsertGroup()
    const result: MenuGroupModel[] = await sut.loadMenuGroup(groupResult.idMenu)
    expect(result).toBeTruthy()
  })

  test('Should delete group on success', async () => {
    const groupResult = await mockInsertGroup()
    await sut.deleteGroup(groupResult.idGroup)
    const result = await getOne(testConnection, 'groups', 'id', groupResult.idGroup)
    expect(result).toEqual([])
  })
})
