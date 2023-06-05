import { Pool } from 'mysql'
import { AddMenuConfigsModel, AddMenuConfigsRepository } from '../../../../data/usecases/add-menu-configs/db-menu-configs-protocols'
import { AddMenuModel, AddMenuRepository } from '../../../../data/usecases/add-menu/db-add-menu-protocols'
import { UpdateMenuConfigsModel, UpdateMenuConfigsRepository } from '../../../../data/usecases/update-menu-configs/db-update-menu-configs-protocols'
import { UpdateMenuModel, UpdateMenuRepository } from '../../../../data/usecases/update-menu/db-update-menu-protocols'
import { LoadCompanyMenuRepository } from '../../../../data/protocols/db/menu/load-company-menu-repository'
import { LoadCompanyMenuCofigRepository } from '../../../../data/protocols/db/menu/load-user-menu-config-repository'
import { LoadMenuRepository } from '../../../../data/protocols/db/menu/load-menu-repository'
import { MenuModel } from '../../../../domain/models/menu'
import { customGet, deleteById, getOne, insertOne, updateAll } from '../mysql-helper'
import { mapCreatedMenu } from './menu-mysql-repository-helper'
import { MenuConfigsModel } from '../../../../domain/models/menu-configs'
import { DeleteMenuRepository } from '../../../../data/protocols/db/menu/delete-menu-repository'
import { DeleteMenuConfigRepository } from '../../../../data/protocols/db/menu/delete-menuConfig-repository'

export class MenuMySqlRepository implements AddMenuRepository, AddMenuConfigsRepository, UpdateMenuConfigsRepository, UpdateMenuRepository, LoadCompanyMenuRepository,
  LoadCompanyMenuCofigRepository, LoadMenuRepository, DeleteMenuRepository, DeleteMenuConfigRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async loadMenuById (id: number): Promise<MenuModel> {
    const result = await getOne(this.connectionPool, 'menu', 'id', id)
    return result[0]
  }

  async loadMenuConfig (idMenu: number): Promise<MenuConfigsModel> {
    const result = await getOne(this.connectionPool, 'menuConfigs', 'menuId', idMenu)
    return result[0]
  }

  async loadMenu (idCompany: number): Promise<MenuModel[]> {
    const result = await getOne(this.connectionPool, 'menu', 'companyId', idCompany)
    for (let i = 0; i < result.length; i++) {
      let temp
      if (result[i].equipTypeId === 4) {
        const recipeCount = await customGet(this.connectionPool, `SELECT COUNT(*) as count FROM cmaxRecipe WHERE menuId = ${result[i].id}`)
        temp = { groupCount: '---', recipeCount: recipeCount[0].count, equipCount: '---' }
      } else {
        const groupCount = await customGet(this.connectionPool, `SELECT COUNT(*) as count FROM groups WHERE menuId = ${result[i].id}`)
        const recipeCount = await customGet(this.connectionPool, `SELECT COUNT(*) as count FROM recipe WHERE menuId = ${result[i].id}`)
        const equipCount = await customGet(this.connectionPool, `SELECT COUNT(*) as count FROM equipment WHERE sentMenu = ${result[i].id}`)
        temp = { groupCount: groupCount[0].count, recipeCount: recipeCount[0].count, equipCount: equipCount[0].count }
      }
      Object.assign(result[i], temp)
    }
    return result
  }

  async updateMenu (menuData: UpdateMenuModel): Promise<any> {
    const setFields = Object.entries(menuData)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')
    const menuResult = await updateAll(this.connectionPool, 'menu', setFields, menuData.id)
    const menuUpdate = Object.assign({ id: menuResult.insertId }, menuData)
    return menuUpdate
  }

  async updateMenuConfigs (menuConfigsData: UpdateMenuConfigsModel): Promise<any> {
    const setFields = Object.entries(menuConfigsData)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')
    const menuConfigResult = await updateAll(this.connectionPool, 'menuConfigs', setFields, menuConfigsData.id)
    const menuConfig = Object.assign({ id: menuConfigResult.insertId }, menuConfigResult)
    return menuConfig
  }

  async addConfig (menuConfigData: AddMenuConfigsModel): Promise<MenuConfigsModel> {
    const menuConfig = await insertOne(this.connectionPool, 'menuConfigs', menuConfigData)
    return Object.assign({ id: menuConfig.insertId }, menuConfigData)
  }

  async add (menuData: AddMenuModel): Promise<MenuModel> {
    const menu = await insertOne(this.connectionPool, 'menu', menuData)
    return mapCreatedMenu(menuData, menu.insertId)
  }

  async deleteMenu (id: number): Promise<boolean> {
    const result = await deleteById(this.connectionPool, 'menu', 'id', id)
    if (result.affectedRows === 0) { return false }
    return true
  }

  async deleteMenuConfig (id: number): Promise<void> {
    await deleteById(this.connectionPool, 'menuConfigs', 'id', id)
  }
}
