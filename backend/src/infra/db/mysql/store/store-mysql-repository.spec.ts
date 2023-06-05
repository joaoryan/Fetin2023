/* eslint-disable no-undef */
import { StoreMySqlRepository } from './store-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { getOne, insertOne } from '../mysql-helper'
import { StoreModel } from '../../../../domain/models/store'
import { mockFakeStoreWithId } from '../../../../domain/mocks/store'

describe('Store MySql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new StoreMySqlRepository(testConnection)

  test('Should LoadStoreById on success', async () => {
    const storeResult = await insertOne(testConnection, 'store', mockFakeStoreWithId())

    const result: StoreModel = await sut.loadStoreById(storeResult.insertId)
    expect(result).toBeTruthy()
  })

  test('Should return a store on add success', async () => {
    const store = await sut.addStore(mockFakeStoreWithId())

    expect(store).toBeTruthy()
    expect(store.companyId).toEqual(1)
    expect(store.storeName).toEqual('storeName')
    expect(store.cnpj).toEqual('storeCnpj')
    expect(store.street).toEqual('streetName')
    expect(store.state).toEqual('stateName')
    expect(store.neighborhood).toEqual('neighborhoodName')
    expect(store.zipCode).toEqual(12345678)
    expect(store.streetNumber).toEqual(1)
    expect(store.city).toEqual('cityName')
    expect(store.latitude).toEqual(1.12345)
    expect(store.longitude).toEqual(-1.12345)
  })

  test('Should DeleteStore on success', async () => {
    const storeResult = await insertOne(testConnection, 'store', mockFakeStoreWithId())

    await sut.deleteStore(storeResult.insertId)
    const result = await getOne(testConnection, 'store', 'id', storeResult.insertId)
    expect(result).toEqual([])
  })

  test('Should return a store on update success', async () => {
    const storeResult = await insertOne(testConnection, 'store', mockFakeStoreWithId())

    const anotherStore: StoreModel = {
      ...mockFakeStoreWithId(),
      id: storeResult.insertId,
      storeName: 'anotherName'
    }

    const updatedStore = await sut.updateStore(anotherStore.id, anotherStore)

    expect(updatedStore).toBeTruthy()
    expect(updatedStore.companyId).toEqual(anotherStore.companyId)
    expect(updatedStore.storeName).toEqual(anotherStore.storeName)
    expect(updatedStore.street).toEqual(anotherStore.street)
    expect(updatedStore.state).toEqual(anotherStore.state)
    expect(updatedStore.neighborhood).toEqual(anotherStore.neighborhood)
    expect(updatedStore.zipCode).toEqual(anotherStore.zipCode)
    expect(updatedStore.streetNumber).toEqual(anotherStore.streetNumber)
    expect(updatedStore.city).toEqual(anotherStore.city)
  })
})
