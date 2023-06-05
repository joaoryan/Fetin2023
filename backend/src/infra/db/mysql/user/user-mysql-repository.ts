/* eslint-disable import/no-duplicates */
import { AddUserRepository } from '../../../../data/protocols/db/user/add-user-repository'
import { AddUserModel } from '../../../../domain/usecases/add-user'
import { UserModel } from '../../../../domain/models/user'
import { insertOne, getOne, updateById, updateAll, deleteById, customDelete, customGet } from '../mysql-helper'
import { mapCreatedUser } from './user-mysql-repository-helper'
import { Pool } from 'mysql'
import { LoadUserByEmailRepository } from '../../../../data/protocols/db/user/load-user-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/user/update-access-token-repository'
import { LoadUserByTokenRepository } from '../../../../data/protocols/db/user/load-user-by-token-repository'
import { LoadUserByActivationRepository } from '../../../../data/protocols/db/user/load-user-by-activation.repository'
import { UpdateActivateTokenRepository } from '../../../../data/protocols/db/user/update-user-by-id'
import { LoadUserByIdRepository } from '../../../../data/protocols/db/user/load-user-by-id-repository'
import { EditUserDataModel } from '../../../../domain/usecases/update-user-data'
import { EditUserDataRepository } from '../../../../data/usecases/update-user-data/db-update-user-data-protocols'
import { LoadUserByCompanyRepository } from '../../../../data/protocols/db/user/load-user-by-company-repository'
import { DeleteUserRepository } from '../../../../data/protocols/db/user/delete-user-repository'
import { AddUserBelongStoreRepository } from '../../../../data/protocols/db/user/add-user-belong-store-repository'
import { UserBelongStoreModel } from '../../../../domain/usecases/add-userBelongStore'
import { DeleteUserBelongStoreRepository } from '../../../../data/protocols/db/user/delete-user-belong-store-repository'
import mysql from 'mysql'
import env from '../../../../main/config/env'
import { LoadUserOldByEmailRepository } from '../../../../data/protocols/db/user/load-userOld-by-email-repository'
import { UserOldModel } from '../../../../domain/models/userOld'
import { LoadUserByCorporateNameRepository } from '../../../../data/protocols/db/user/load-user-by-corporateName-repository'
import { loadUserByCorporateNameSQL } from '../query-helpers'

export class UserMySqlRepository implements LoadUserByCorporateNameRepository, AddUserRepository, AddUserBelongStoreRepository, DeleteUserBelongStoreRepository, DeleteUserRepository, LoadUserByEmailRepository, UpdateAccessTokenRepository, LoadUserByTokenRepository, LoadUserByActivationRepository, UpdateActivateTokenRepository, LoadUserByIdRepository, EditUserDataRepository, LoadUserByCompanyRepository, LoadUserOldByEmailRepository {
  public readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async DeleteUserBelongStore (idUser: number, idStore: number): Promise<Boolean> {
    const result = await customDelete(this.connectionPool, `DELETE FROM UserBelongStore WHERE idStore = ${idStore} AND idUser = ${idUser};`)
    if (result.affectedRows === 0) return false
    return true
  }

  async addUserBelongStore (relationData: UserBelongStoreModel): Promise<UserBelongStoreModel> {
    await insertOne(this.connectionPool, 'UserBelongStore', relationData)
    return relationData
  }

  async deleteUser (id: number): Promise<boolean> {
    const result = await deleteById(this.connectionPool, 'User', 'id', id)
    if (result.affectedRows === 0) return false
    return true
  }

  async loadByCompany (id: number): Promise<UserModel[]> {
    const result = await getOne(this.connectionPool, 'User', 'companyId', id)
    return result
  }

  async add (userData: AddUserModel): Promise<UserModel> {
    const result = await insertOne(this.connectionPool, 'User', userData)
    return mapCreatedUser(userData, result.insertId)
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const result = await getOne(this.connectionPool, 'User', 'email', email)
    return result[0]
  }

  async updateAccessToken (id: number, accessToken: string): Promise<void> {
    await updateById(this.connectionPool, 'User', 'accessToken', id, accessToken)
  }

  async loadByToken (token: string, role?: string): Promise<UserModel> {
    const result = await getOne(this.connectionPool, 'User', 'accessToken', token)
    if (!role || role === result[0].userTypeId) {
      return result[0]
    }
    return null
  }

  async updateActivateToken (id: number, emailVerified: boolean): Promise<void> {
    await updateById(this.connectionPool, 'User', 'emailVerified', id, true)
  }

  async loadByActivation (activateToken: string): Promise<UserModel> {
    const result = await getOne(this.connectionPool, 'User', 'activateToken', activateToken)
    return result[0]
  }

  async loadById (id: number): Promise<UserModel> {
    const result = await getOne(this.connectionPool, 'User', 'id', id)
    return result[0]
  }

  async editUserData (userData: EditUserDataModel): Promise<any> {
    const setFields = Object.entries(userData)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')

    const user = await updateAll(this.connectionPool, 'User', setFields, userData.id)
    return user
  }

  async loadUserOldByEmail (email: string): Promise<UserOldModel> {
    const previousConnection = mysql.createPool(env.previousDb)
    const result = await getOne(previousConnection, 'User', 'email', email)
    previousConnection.end()
    return result[0]
  }

  async loadUserByCorporateName (corporateName: string): Promise<UserModel> {
    const sql = loadUserByCorporateNameSQL(corporateName)
    console.log('sql ->', sql)
    const result = await customGet<UserModel[]>(this.connectionPool, sql)
    console.log('result ->', result)
    if (result.length === 0) return null
    return result[0]
  }
}
