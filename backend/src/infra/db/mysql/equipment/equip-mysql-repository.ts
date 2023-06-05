import { Pool } from 'mysql'
import { LoadEquipByPinRepository } from '../../../../data/protocols/db/equipment/load-equip-by-pin-repository'
import { RegisterEquipRepository } from '../../../../data/protocols/db/equipment/register-equip-repository'
import { LoadEquipByMenuRepository } from '../../../../data/protocols/db/equipment/load-equip-by-menu-repository'
import { LoadEquipByCompanyIdRepository } from '../../../../data/protocols/db/equipment/load-equip-by-company-id-repository'
import { LoadEquipByIdRepository } from '../../../../data/protocols/db/equipment/load-equip-by-id-repository'
import { AddEquipmentRepository } from '../../../../data/protocols/db/equipment/add-equipment-repository'
import { EquipModel, UpdateEquipModel } from '../../../../domain/models/equipment'
import { customGet, deleteById, getOne, insertOne, updateAll, updateById } from '../mysql-helper'
import { countEquipmentSQL, loadEquipByCompanyIdSQL, loadEquipByIdSQL, loadEquipByUserIdSQL } from '../query-helpers'
import { UpdateEquipmentRepository } from '../../../../data/protocols/db/equipment/update-equipment-repository'
import { DeleteEquipmentRepository } from '../../../../data/protocols/db/equipment/delete-equipment-repository'
import { CountEquipmentRepository } from '../../../../data/protocols/db/equipment/count-equipment-repository'
import { LoadEquipByUserIdRepository } from '../../../../data/protocols/db/equipment/load-equip-by-user-id-repository'

export class EquipMySqlRepository implements
  LoadEquipByPinRepository,
  RegisterEquipRepository,
  LoadEquipByMenuRepository,
  LoadEquipByCompanyIdRepository,
  LoadEquipByIdRepository,
  AddEquipmentRepository,
  UpdateEquipmentRepository,
  DeleteEquipmentRepository,
  CountEquipmentRepository,
  LoadEquipByUserIdRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async loadEquipByUserId (userId: number): Promise<LoadEquipByUserIdRepository.Result> {
    const sql = loadEquipByUserIdSQL(userId)
    return await customGet<LoadEquipByUserIdRepository.Result>(this.connectionPool, sql)
  }

  async loadEquipBySerialNumber (serialNumber: string): Promise<EquipModel> {
    const result = await getOne(this.connectionPool, 'equipment', 'serialNumber', serialNumber)
    return result[0]
  }

  async addEquipment (equipment: AddEquipmentRepository.Parameter): Promise<AddEquipmentRepository.Result> {
    const result = await insertOne(this.connectionPool, 'equipment', equipment)
    const equipmentResponse = await getOne(this.connectionPool, 'equipment', 'id', result.insertId)
    return equipmentResponse[0]
  }

  async loadByEquipMenu (menuId: number): Promise<EquipModel[]> {
    const result = await getOne(this.connectionPool, 'equipment', 'sentMenu', menuId)
    return result
  }

  async loadByEquipPin (IOKPin: string): Promise<EquipModel> {
    const result = await getOne(this.connectionPool, 'equipment', 'iokPin', IOKPin)
    return result[0]
  }

  async registerEquip (idEquip: number, idCompany: number): Promise<void> {
    await updateById(this.connectionPool, 'equipment', 'companyId', idEquip, idCompany)
  }

  async loadEquipByCompanyId (companyId: number): Promise<LoadEquipByCompanyIdRepository.Result> {
    const sql = loadEquipByCompanyIdSQL(companyId)
    return await customGet<LoadEquipByCompanyIdRepository.Result>(this.connectionPool, sql)
  }

  async loadEquipById (id: number): Promise<LoadEquipByIdRepository.Result> {
    const sql = loadEquipByIdSQL(id)
    const result = await customGet<LoadEquipByIdRepository.Result[]>(this.connectionPool, sql)
    if (result.length === 0) return null
    return result[0]
  }

  async updateEquipment (id: number, equipment: UpdateEquipModel): Promise<boolean> {
    const setFields = Object.entries(equipment)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')

    const result = await updateAll(this.connectionPool, 'equipment', setFields, id)
    if (result.affectedRows === 0) return false
    return true
  }

  async deleteEquipment (id: number): Promise<boolean> {
    const result = await deleteById(this.connectionPool, 'equipment', 'id', id)
    if (result.affectedRows === 0) return false
    return true
  }

  async countEquipment (where?: CountEquipmentRepository.Parameter): Promise<CountEquipmentRepository.Result> {
    const sql = countEquipmentSQL(where)
    const result = await customGet(this.connectionPool, sql)
    return result[0]
  }
}
