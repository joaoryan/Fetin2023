import { Pool } from 'mysql'
import { mapCreatedStore } from './store-mysql-repository-helper'
import { LoadStoreByIdRepository } from '../../../../data/protocols/db/store/load-store-by-id-repository'
import { LoadStoresByCompanyIdRepository } from '../../../../data/protocols/db/store/load-stores-by-company-id-repository'
import { DeleteStoreRepository } from '../../../../data/usecases/delete-store/db-delete-store-protocols'
import { AddStoreModel, AddStoreRepository, StoreModel } from '../../../../data/usecases/add-store/db-add-store-protocols'
import { UpdateStoreRepository } from '../../../../data/usecases/update-store/db-update-store-protocols'
import { customGet, deleteById, getOne, insertOne, updateAll } from '../mysql-helper'
import { LoadStoresByUserRepository } from '../../../../data/protocols/db/store/load-stores-by-user-repository'

export class StoreMySqlRepository implements AddStoreRepository, DeleteStoreRepository, LoadStoreByIdRepository, LoadStoresByCompanyIdRepository, UpdateStoreRepository, LoadStoresByUserRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async loadStoresByUser (idUser: number): Promise<StoreModel[]> {
    const result = await customGet(this.connectionPool, `SELECT * FROM store AS S INNER JOIN UserBelongStore AS U ON (U.idStore = S.id) WHERE U.idUser = ${idUser}`)
    for (let i = 0; i < result.length; i++) {
      const equipCount = await customGet(this.connectionPool, `SELECT COUNT(*) as count FROM equipment WHERE storeId = ${result[i].id}`)
      const temp = { equipmentCount: equipCount[0].count }
      Object.assign(result[i], temp)
    }
    return result
  }

  async addStore (storeData: AddStoreModel): Promise<StoreModel> {
    const result = await insertOne(this.connectionPool, 'store', storeData)
    return mapCreatedStore(storeData, result.insertId)
  }

  async deleteStore (id: number): Promise<void> {
    await deleteById(this.connectionPool, 'store', 'id', id)
  }

  async loadStoreById (id: number): Promise<StoreModel> {
    const result = await getOne(this.connectionPool, 'store', 'id', id)
    return result[0]
  }

  async loadStoresByCompanyId (idCompany: number): Promise<StoreModel[]> {
    const result = await getOne(this.connectionPool, 'store', 'companyId', idCompany)
    for (let i = 0; i < result.length; i++) {
      const equipCount = await customGet(this.connectionPool, `SELECT COUNT(*) as count FROM equipment WHERE storeId = ${result[i].id}`)
      const temp = { equipmentCount: equipCount[0].count }
      Object.assign(result[i], temp)
    }
    console.log(result)
    if (result.length === 0) { return null }
    return result
  }

  async updateStore (id: number, storeData: StoreModel): Promise<StoreModel> {
    const storeFields = (
      `id = ${id},
      companyId = ${storeData.companyId},
      storeName = '${storeData.storeName}',
      cnpj = '${storeData.cnpj}',
      street = '${storeData.street}',
      state = '${storeData.state}',
      neighborhood = '${storeData.neighborhood}',
      zipCode = ${storeData.zipCode},
      streetNumber = ${storeData.streetNumber},
      city = '${storeData.city}',
      latitude = '${storeData.latitude}',
      longitude = '${storeData.longitude}'`
    )
    const result = await updateAll(this.connectionPool, 'store', storeFields, id)
    if (result.affectedRows === 0) {
      return null
    }
    return { ...storeData, id: id }
  }
}
