import { mockAddEquipmentRequest, mockEquipModel, mockInsertEquip } from '../../../../domain/mocks/equipment'
/* eslint-disable no-undef */
import { describe, test, expect, afterAll, beforeEach } from '@jest/globals'
import { EquipMySqlRepository } from './equip-mysql-repository'
import { deleteAll, getOne, insertOne } from '../mysql-helper'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import env from '../../../../main/config/env'
import { EquipModel } from './../../../../domain/models/equipment'

const mockDbInsertions = async (testConnection: mysql.Pool): Promise<{ serialNumber1: string, equipmentId1: number, equipmentId2: number }> => {
  const createdEquip1 = await mockInsertEquip()

  const createdEquip2 = await mockInsertEquip()

  return {
    serialNumber1: 'valid_serial_number_1',
    equipmentId1: createdEquip1.idEquip,
    equipmentId2: createdEquip2.idEquip
  }
}

const mockDbGetEquipment = async (testConnection: mysql.Pool, id: number): Promise<EquipModel> => {
  const result = await getOne(testConnection, 'equipment', 'id', id)
  return result[0]
}
describe('Equip Mysql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  beforeEach(async () => {
    await deleteAll(testConnection, 'equipment')
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new EquipMySqlRepository(testConnection)

  test('Should return a equip on loadByEquipPin success', async () => {
    await mockInsertEquip()

    const loadedEquipment = await sut.loadByEquipPin('PinValid')
    expect(loadedEquipment).toBeTruthy()
  })

  test('Should return null if loadByEquipPin fails', async () => {
    const loadedAccount = await sut.loadByEquipPin('invalid_PIN')
    expect(loadedAccount).toBeFalsy()
  })

  test('Should return a equip on registerEquip success', async () => {
    const resultEquip = await mockInsertEquip()

    const resultCompany = await insertOne(testConnection, 'company', {
      corporateName: 'register_name',
      companyType: 1
    })

    await sut.registerEquip(resultEquip.idEquip, resultCompany.insertId)
    const created = await getOne(testConnection, 'equipment', 'id', resultEquip.idEquip)
    expect(created).toBeTruthy()
    expect(created[0].companyId).toBe(resultCompany.insertId)
  })

  test('Should return a equip on registerEquip fails', async () => {
    const resultEquip = await mockInsertEquip()

    const resultCompany = await insertOne(testConnection, 'company', {
      corporateName: 'register_name',
      companyType: 1
    })

    await sut.registerEquip(resultEquip.idEquip, 0)
    const created = await getOne(testConnection, 'equipment', 'id', resultEquip.idEquip)
    expect(created).toBeTruthy()
    expect(created[0].companyId).not.toBe(resultCompany.insertId)
  })

  test('Should return a equip on loadByEquipMenu success', async () => {
    await mockInsertEquip()

    const loadedEquipment = await sut.loadByEquipMenu(1)
    expect(loadedEquipment).toBeTruthy()
  })

  test('Should return null if loadByEquipMenu fails', async () => {
    const loadedAccount = await sut.loadByEquipMenu(1000)
    expect(loadedAccount).toEqual([])
  })

  describe('loadEquipBySerialNumber method tests', () => {
    test('should return a list of equipment with the serial number defined', async () => {
      await mockInsertEquip()
      const equipment = await sut.loadEquipBySerialNumber('serialNumber')
      expect(equipment).toBeTruthy()
    })

    test('should return an empty list if no records exist', async () => {
      const equipment = await sut.loadEquipBySerialNumber('serialNumberNotExist')
      expect(equipment).toBeUndefined()
    })
  })

  describe('loadEquipByCompanyId method tests', () => {
    test('should return a list of equipment with the companyId defined', async () => {
      await mockInsertEquip()
      const equipmentList = await sut.loadEquipByCompanyId(1)
      expect(equipmentList[0].id).toBeTruthy()
    })

    test('should return an empty list if no records exist', async () => {
      const companyId = 1
      const equipmentList = await sut.loadEquipByCompanyId(companyId)
      expect(equipmentList.length).toBe(0)
    })
  })

  describe('loadEquipById method tests', () => {
    test('should return a equipment with the id 1', async () => {
      const { idEquip } = await mockInsertEquip()
      const equipment = await sut.loadEquipById(idEquip)
      expect(equipment).toHaveProperty('id', idEquip)
    })
    test('should return a equipment with the id 2', async () => {
      const { idEquip } = await mockInsertEquip()
      const equipment = await sut.loadEquipById(idEquip)
      expect(equipment).toHaveProperty('id', idEquip)
    })

    test('should return null if no records exist', async () => {
      const id = 1
      const equipment = await sut.loadEquipById(id)
      expect(equipment).toBeNull()
    })
  })

  describe('addEquipment method tests', () => {
    test('should add a equipment on success', async () => {
      const equipment = mockAddEquipmentRequest()
      delete equipment.body.idEquipment
      const createdEquipment = await sut.addEquipment(equipment.body)
      expect(createdEquipment).toHaveProperty('id')
    })
  })

  describe('UpdateEquipment method tests', () => {
    test('should update a equipment successfully', async () => {
      const { equipmentId1 } = await mockDbInsertions(testConnection)
      const updateSubmit = await mockEquipModel()
      await sut.updateEquipment(equipmentId1, updateSubmit)
      const updatedEquipment = await mockDbGetEquipment(testConnection, equipmentId1)
      expect(updatedEquipment).toHaveProperty('name', 'name')
    })
    test('should return false if the id does not exist in the database', async () => {
      const updateSubmit = await mockEquipModel()
      const result = await sut.updateEquipment(1234, updateSubmit)
      expect(result).toBeFalsy()
    })
  })

  describe('DeleteEquipment method tests', () => {
    test('should delete a equipment successfully', async () => {
      const { equipmentId1 } = await mockDbInsertions(testConnection)
      const savedEquipment = await mockDbGetEquipment(testConnection, equipmentId1)
      expect(savedEquipment).toHaveProperty('id', equipmentId1)
      const result = await sut.deleteEquipment(equipmentId1)
      expect(result).toBeTruthy()
      const deletedEquipment = await mockDbGetEquipment(testConnection, equipmentId1)
      expect(deletedEquipment).toBeUndefined()
    })
    test('should return false if no rows are affected', async () => {
      const result = await sut.deleteEquipment(1234)
      expect(result).toBeFalsy()
    })
  })

  describe('CountEquipment method tests', () => {
    test('should return an object with the prop count on success (number)', async () => {
      const where = { storeId: '1' }
      await mockInsertEquip()
      const result = await sut.countEquipment(where)
      expect(result).toEqual({ count: 1 })
    })
    test('should return an object with the prop count on success (string)', async () => {
      const where = { name: 'name' }
      await mockInsertEquip()
      const result = await sut.countEquipment(where)
      expect(result).toEqual({ count: 1 })
    })
    test('should return an object with the prop count on success (undefined)', async () => {
      await mockInsertEquip()
      const result = await sut.countEquipment(undefined)
      expect(result).toEqual({ count: 1 })
    })
  })
})
