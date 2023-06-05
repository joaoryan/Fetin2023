/* eslint-disable no-undef */
import { describe, test, afterAll, beforeEach } from '@jest/globals'
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { deleteAll, getOne, insertOne, updateById } from '../../infra/db/mysql/mysql-helper'
import { sign } from 'jsonwebtoken'
import { mockAddEquipmentRequest, mockCountEquipmentRequest, mockEquipModel, mockInsertEquip } from '../../domain/mocks/equipment'
import { mockAccessToken } from '../../domain/mocks/user'
import { EquipModel } from '../../domain/models/equipment'

const mockCreateEquipment = async (testConnection: mysql.Pool): Promise<{ id: number }> => {
  const equipment = await mockEquipModel()
  const createdEquipment = await insertOne(testConnection, 'equipment', equipment)
  return { id: createdEquipment.insertId }
}

const mockDbGetEquipment = async (testConnection: mysql.Pool, id: number): Promise<EquipModel> => {
  const result = await getOne(testConnection, 'equipment', 'id', id)
  return result[0]
}

describe('Equipment Routes', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  beforeEach(async () => {
    await deleteAll(testConnection, 'User')
    await deleteAll(testConnection, 'equipment')
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('GET - /equipment/load/SentMenu/:idMenu', () => {
    test('Should return 200 on get equipment by menuId success', async () => {
      const result = await insertOne(testConnection, 'User', {
        userName: 'valid_name',
        email: 'getEquipMenu@mail.com',
        emailVerified: true,
        companyId: 1,
        phone: 'valid_phone',
        password: 'valid_password',
        creationDate: '2022-04-13',
        userTypeId: 'admin'
      })
      const id = result.insertId
      const accessToken = sign({ id }, env.jwtSecret)
      await updateById(testConnection, 'User', 'accessToken', id, accessToken)

      const companyResult = await insertOne(testConnection, 'company', {
        corporateName: 'valid_name',
        companyType: 1
      })
      const menuResult = await insertOne(testConnection, 'menu', {
        menuName: 'menu1',
        equipTypeId: 1,
        companyId: companyResult.insertId,
        creationDate: '24-04-2022',
        lastUpdate: '24-04-2022',
        menuVersion: 1,
        deletionDate: '24-042022',
        userId: 1,
        deletedBy: 'valid_name',
        language: 'valid_language'
      })
      await insertOne(testConnection, 'equipment', {
        idUser: 0,
        typeEquipment: 'typeEquipment',
        storeId: 0,
        serialNumber: 'serialNumber',
        creationDate: 'creationDate',
        softwareVersion: 'softwareVersion',
        sentMenu: 0,
        companyId: 0,
        iokPin: 'iokPin',
        name: 'name',
        categoryId: 0,
        dataUpdate: true,
        appUpdate: true,
        statusData: 'statusData',
        statusApp: 'statusData',
        hashSw: 'hashSw',
        menuId: 0,
        lastUpdate: 0
      })
      await request(app1)
        .get(`/api/equipment/SentMenu/${menuResult.insertId}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if load company fails', async () => {
      await request(app1)
        .get('/api/equipment/SentMenu/1')
        .expect(403)
    })
  })

  describe('GET - /user/:userId/privilege/:userPrivilegeUser/equipment/:companyId/company', () => {
    test('Should return 200 on get equipment by companyId success', async () => {
      const accessToken = await mockAccessToken()
      await mockInsertEquip()
      await request(app1)
        .get('/api/user/1/privilege/admCli/equipment/1/company')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 if you do not have any equipment', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .get('/api/user/1/privilege/admCli/equipment/1/company')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 403 error if not a user', async () => {
      await mockCreateEquipment(testConnection)
      await request(app1)
        .get('/api/user/1/privilege/admCli/equipment/1/company')
        .expect(403)
    })

    test('should return 400 for invalid parameters', async () => {
      const accessToken = await mockAccessToken()
      await mockCreateEquipment(testConnection)
      await request(app1)
        .get('/api/user/1/privilege/admCli/equipment/invalid/company')
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })

  describe('GET - /linux-equipments/hasUpdate/:idEquip/:iokPin', () => {
    test('Should return 200 on get has update equipment by id success', async () => {
      const { id } = await mockCreateEquipment(testConnection)
      await request(app1)
        .get(`/api/linux-equipments/hasUpdate/${id}/${'DE@Prat1c@BR2021'}`)
        .expect(200)
    })
    test('Should return 204 if you do not have any equipment', async () => {
      await request(app1)
        .get(`/api/linux-equipments/hasUpdate/${0}/${'DE@Prat1c@BR2021'}`)
        .expect(204)
    })
  })

  describe('GET - /equipment/:id', () => {
    test('Should return 200 on get equipment by id success', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await mockCreateEquipment(testConnection)
      await request(app1)
        .get(`/api/equipment/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 if you do not have any equipment', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .get('/api/equipment/1')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 403 error if not a user', async () => {
      const { id } = await mockCreateEquipment(testConnection)
      await request(app1)
        .get(`/api/equipment/${id}`)
        .expect(403)
    })

    test('should return 400 for invalid parameters', async () => {
      const accessToken = await mockAccessToken()
      await mockCreateEquipment(testConnection)
      await request(app1)
        .get('/api/equipment/invalid')
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })

  describe('POST - /linux-equipments/create-new-linux/:pin', () => {
    test('should return 201 if the equipment is created successfully', async () => {
      const equip = await mockAddEquipmentRequest()
      await request(app1)
        .post(`/api/linux-equipments/create-new-linux/${'DE@Prat1c@BR2021'}`)
        .send(equip.body)
        .expect(201)
    })

    test('should return 400 for invalid parameters', async () => {
      await request(app1)
        .post(`/api/linux-equipments/create-new-linux/${'DE@Prat1c@BR2021'}`)
        .set({ invalid: {} })
        .expect(400)
    })

    test('should return 400 if no object is sent', async () => {
      await request(app1)
        .post(`/api/linux-equipments/create-new-linux/${'DE@Prat1c@BR2021'}`)
        .expect(400)
    })
  })

  describe('PUT - /equipment/:id', () => {
    test('Should return 200 on Update equipment by id success', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await mockCreateEquipment(testConnection)
      const savedEquipment = await mockDbGetEquipment(testConnection, id)
      savedEquipment.name = 'Update_name'
      await request(app1)
        .put(`/api/equipment/${id}`)
        .set('x-access-token', accessToken)
        .send({ equipment: savedEquipment })
        .expect(200)
    })

    test('Should return 403 error if not a user', async () => {
      const { id } = await mockCreateEquipment(testConnection)
      const savedEquipment = await mockDbGetEquipment(testConnection, id)
      savedEquipment.name = 'Update_name'
      await request(app1)
        .put(`/api/equipment/${id}`)
        .send({ equipment: savedEquipment })
        .expect(403)
    })

    test('should return 400 for invalid parameters', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await mockCreateEquipment(testConnection)
      const savedEquipment = await mockDbGetEquipment(testConnection, id)
      savedEquipment.name = 'Update_name'
      await request(app1)
        .put('/api/equipment/invalid')
        .set('x-access-token', accessToken)
        .send({ equipment: savedEquipment })
        .expect(400)
    })
    test('should return 400 for invalid body', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await mockCreateEquipment(testConnection)
      const savedEquipment = await mockDbGetEquipment(testConnection, id)
      savedEquipment.name = 'Update_name'
      await request(app1)
        .put(`/api/equipment/${id}`)
        .set('x-access-token', accessToken)
        .send({ invalidBody: {} })
        .expect(400)
    })
  })

  describe('DELETE - /equipment/:id', () => {
    test('Should return 200 on delete equipment by id success', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await mockCreateEquipment(testConnection)
      await request(app1)
        .delete(`/api/equipment/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 error if not a user', async () => {
      const { id } = await mockCreateEquipment(testConnection)
      await request(app1)
        .delete(`/api/equipment/${id}`)
        .expect(403)
    })

    test('should return 400 for invalid parameters', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .delete('/api/equipment/invalid')
        .set('x-access-token', accessToken)
        .expect(400)
    })

    test('should return 400 if id is not found', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .delete('/api/equipment/1')
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })

  describe('COUNT - /equipment/count', () => {
    test('should return 200 on success with conditional', async () => {
      const accessToken = await mockAccessToken()
      await mockCreateEquipment(testConnection)
      await request(app1)
        .get('/api/equipment/count')
        .query(mockCountEquipmentRequest().query)
        .set('x-access-token', accessToken)
        .expect(200)
    })
    test('should return 200 on success without conditional', async () => {
      const accessToken = await mockAccessToken()
      await mockCreateEquipment(testConnection)
      await request(app1)
        .get('/api/equipment/count')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 error if not a user', async () => {
      await mockCreateEquipment(testConnection)
      await request(app1)
        .get('/api/equipment/count')
        .query(mockCountEquipmentRequest().query)
        .expect(403)
    })

    test('should return 400 when the condition contains an invalid field', async () => {
      const accessToken = await mockAccessToken()
      await mockCreateEquipment(testConnection)
      await request(app1)
        .get('/api/equipment/count')
        .query({ where: { invalid: 'any' } })
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })
})
