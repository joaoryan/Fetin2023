/* eslint-disable no-undef */
import { MenuMySqlRepository } from './menu-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { getOne } from '../mysql-helper'
import { MenuModel } from '../../../../domain/models/menu'
import { MenuConfigsModel } from '../../../../domain/models/menu-configs'
import { mockAddMenu, mockAddMenuConfig, mockUpdateMenu, mockUpdateMenuConfig, mockInsertMenu, mockInsertMenuConfig } from '../../../../domain/mocks/menus'

describe('Menu Mysql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new MenuMySqlRepository(testConnection)

  test('Should create a menu configs on success', async () => {
    const menuConfigResult = await mockAddMenuConfig()
    const result = await sut.addConfig(menuConfigResult)
    expect(result).toBeTruthy()
  })

  test('Should create a menu on success', async () => {
    const menuResult = await mockAddMenu()
    const result = await sut.add(menuResult)
    expect(result).toBeTruthy()
  })

  test('Should Update a menu on success', async () => {
    const menuResult = await mockUpdateMenu()
    const result = await sut.updateMenu(menuResult)
    expect(result).toBeTruthy()
  })

  test('Should Update a menu config on success', async () => {
    const menuConfigResult = await mockUpdateMenuConfig()
    const result = await sut.updateMenuConfigs(menuConfigResult)
    expect(result).toBeTruthy()
  })

  test('Should delete menu on success', async () => {
    const menuResult = await mockInsertMenu()
    await sut.deleteMenu(menuResult.idMenu)
    const result = await getOne(testConnection, 'menu', 'id', menuResult.idMenu)
    expect(result).toEqual([])
  })

  test('Should delete menu config on success', async () => {
    const menuConfigResult = await mockInsertMenuConfig()
    await sut.deleteMenuConfig(menuConfigResult.idConfig)
    const result = await getOne(testConnection, 'menuConfigs', 'id', menuConfigResult.idConfig)
    expect(result).toEqual([])
  })

  test('Should load company menus on success', async () => {
    const menuResult = await mockInsertMenu()
    const result: MenuModel[] = await sut.loadMenu(menuResult.idCompany)
    expect(result).toBeTruthy()
  })

  test('Should loadMenuConfig on success', async () => {
    const menuConfigResult = await mockInsertMenuConfig()
    const result: MenuConfigsModel = await sut.loadMenuConfig(menuConfigResult.idMenu)
    expect(result).toBeTruthy()
  })

  test('Should loadMenuGroup on success', async () => {
    const menuResult = await mockInsertMenu()
    const result: MenuModel = await sut.loadMenuById(menuResult.idMenu)
    expect(result).toBeTruthy()
  })
})
