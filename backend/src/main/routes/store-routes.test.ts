/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql, { Pool } from 'mysql'
import { deleteAll, insertOne } from '../../infra/db/mysql/mysql-helper'
import { mockAddStoreRequest, mockFakeStoreWithId, mockUpdateStoreRequest } from '../../domain/mocks/store'
import { mockAccessToken } from '../../domain/mocks/user'

const makeCreateFakeStore = async (testConnection: Pool): Promise<{ id: number }> => {
  const createdStore = await insertOne(testConnection, 'store', mockFakeStoreWithId())
  return { id: createdStore.insertId }
}

describe('Store routes', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  beforeEach(async () => {
    await deleteAll(testConnection, 'User')
    await deleteAll(testConnection, 'store')
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('POST - /store', () => {
    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .post('/api/store')
        .set('x-access-token', accessToken)
        .send(mockAddStoreRequest().body)
        .expect(201)
    })
    test('Shoud return 400 for invalid parameters', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .post('/api/store')
        .set('x-access-token', accessToken)
        .send({ invalid: {} })
        .expect(400)
    })
    test('Should return 400  if no store is provided', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .post('/api/store')
        .set('x-access-token', accessToken)
        .send({})
        .expect(400)
    })
    test('Should return 403 if no x-access-token is provided', async () => {
      await request(app1)
        .post('/api/store')
        .send(mockAddStoreRequest().body)
        .expect(403)
    })
  })

  describe('DELETE - /store/id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const { id } = await makeCreateFakeStore(testConnection)
      await request(app1)
        .delete(`/api/store/${id}`)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await makeCreateFakeStore(testConnection)
      await request(app1)
        .delete(`/api/store/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 400 for invalid parameters', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .delete('/api/store/invalid')
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })

  describe('GET - /store/id', () => {
    test('Should return 200 on get store by id success', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await makeCreateFakeStore(testConnection)
      await request(app1)
        .get(`/api/store/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
    test('Should return 204 if there is no store to return', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .get('/api/store/1')
        .set('x-access-token', accessToken)
        .expect(204)
    })
    test('Should return 403 if not an user', async () => {
      const { id } = await makeCreateFakeStore(testConnection)
      await request(app1)
        .get(`/api/store/${id}`)
        .expect(403)
    })
    test('Should return 400 for invalid parameters', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .get('/api/store/invalid')
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })

  describe('GET - /user/:userId/privilege/:userPrivilegeUser/company/:companyId/stores', () => {
    test('Should return 200 on get equipment by id success', async () => {
      const accessToken = await mockAccessToken()
      await makeCreateFakeStore(testConnection)
      await request(app1)
        .get('/api/user/1/privilege/admCli/company/1/stores')
        .set('x-access-token', accessToken)
        .expect(200)
    })
    test('Should return 204 if there is no store to return', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .get('/api/user/1/privilege/admCli/company/1/stores')
        .set('x-access-token', accessToken)
        .expect(204)
    })
    test('Should return 403 if not a user', async () => {
      await makeCreateFakeStore(testConnection)
      await request(app1)
        .get('/api/user/1/privilege/admCli/company/1/stores')
        .expect(403)
    })
  })
  describe('PUT - /store/id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const { id } = await makeCreateFakeStore(testConnection)
      await request(app1)
        .put(`/api/store/${id}`)
        .send(mockUpdateStoreRequest(id).body)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await makeCreateFakeStore(testConnection)
      await request(app1)
        .put(`/api/store/${id}`)
        .set('x-access-token', accessToken)
        .send(mockUpdateStoreRequest(id).body)
        .expect(200)
    })

    test('Should return 400 if no store is provided', async () => {
      const accessToken = await mockAccessToken()
      const { id } = await makeCreateFakeStore(testConnection)
      await request(app1)
        .put(`/api/store/${id}`)
        .set('x-access-token', accessToken)
        .send({})
        .expect(400)
    })
  })
})
