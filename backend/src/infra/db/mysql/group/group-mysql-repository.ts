import { Pool } from 'mysql'
import { customGet, deleteById, getOne, insertOne, updateAll } from '../mysql-helper'
import { mapCreatedGroup } from './group-mysql-repository-helper'
import { AddGroupRepository } from '../../../../data/protocols/db/group/add-group-repository'
import { UpdateGroupRepository } from '../../../../data/protocols/db/group/update-group-repository'
import { LoadGroupRepository } from '../../../../data/protocols/db/group/load-group-repository'
import { LoadMenuGroupRepository } from '../../../../data/protocols/db/group/load-menu-group-repository'
import { DeleteGroupRepository } from '../../../../data/protocols/db/group/delete-group-repository'
import { MenuGroupModel } from '../../../../domain/models/menu-group'
import { AddGroupModel } from '../../../../domain/usecases/add-group'
import { UpdateGroupModel } from '../../../../domain/usecases/update-group'

export class GroupMySqlRepository implements AddGroupRepository, UpdateGroupRepository, LoadGroupRepository, LoadMenuGroupRepository, DeleteGroupRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async deleteGroup (id: number): Promise<boolean> {
    const result = await deleteById(this.connectionPool, 'groups', 'id', id)
    if (result.affectedRows === 0) return false
    return true
  }

  async loadMenuGroup (idMenu: number): Promise<MenuGroupModel[]> {
    const result = await getOne(this.connectionPool, 'groups', 'menuId', idMenu)
    for (let i = 0; i < result.length; i++) {
      const recipeCount = await customGet(this.connectionPool, `SELECT COUNT(*) as count FROM recipe WHERE groupId = ${result[i].id}`)
      const temp = { recipeCount: recipeCount[0].count }
      Object.assign(result[i], temp)
    }
    return result
  }

  async loadGroup (id: number): Promise<MenuGroupModel> {
    const result = await getOne(this.connectionPool, 'groups', 'id', id)
    return result[0]
  }

  async updateGroup (groupData: UpdateGroupModel): Promise<any> {
    const groupFields = (
      `menuId = ${groupData.menuId}, 
      groupName = "${groupData.groupName}", 
      groupPosition = ${groupData.groupPosition}, 
      groupImage = "${groupData.groupImage}", 
      preHeat = ${groupData.preHeat}, 
      creationDate = "${groupData.creationDate}", 
      lastUpdate = "${groupData.lastUpdate}"`
    )
    const group = await updateAll(this.connectionPool, 'groups', groupFields, groupData.id)
    return group
  }

  async addGroup (groupData: AddGroupModel): Promise<MenuGroupModel> {
    const menu = await insertOne(this.connectionPool, 'groups', groupData)
    return mapCreatedGroup(groupData, menu.insertId)
  }
}
