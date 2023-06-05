import { Pool } from 'mysql'
import { AddConfigsRepository } from '../../../../data/protocols/db/configs/add-configs-repository'
import { LoadConfigsByUserIdRepository } from '../../../../data/protocols/db/configs/load-configs-by-user-id-repository'
import { ConfigsModel } from '../../../../domain/models/configs'
import { AddConfigsModel } from '../../../../domain/usecases/add-configs'
import { UpdateConfigsModel } from '../../../../domain/usecases/update-configs'
import { getOne, insertOne, updateAll } from '../mysql-helper'
import { mapCreatedConfigs } from './configs-mysql-repository-helper'

export class ConfigsMySqlRepository implements AddConfigsRepository, LoadConfigsByUserIdRepository {
  private readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }

  async add (configsData: AddConfigsModel): Promise<ConfigsModel> {
    const result = await insertOne(this.connectionPool, 'userConfigs', configsData)
    return mapCreatedConfigs(configsData, result.insertId)
  }

  async loadByUserId (id: number): Promise<ConfigsModel> {
    const result = await getOne(this.connectionPool, 'userConfigs', 'userId', id)
    return result[0]
  }

  async updateConfigs (configs: UpdateConfigsModel): Promise<any> {
    const setFields = Object.entries(configs)
      .map(value => `${value[0]} = ${isNaN(value[1]) ? `"${value[1]}"` : value[1]}`)
      .join(', ')

    const user = await updateAll(this.connectionPool, 'userConfigs', setFields, configs.id)
    return user
  }
}
