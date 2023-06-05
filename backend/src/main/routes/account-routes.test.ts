/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { deleteAll } from '../../infra/db/mysql/mysql-helper'
import { makeFakeRequest, makeFakeRequestInvalidLogin, makeFakeRequestLogin, makeFakeRequestUserAdm, mockAccessToken, mockActivateTokenRequest, mockInsertUser, mockUpdateUserRequest } from '../../domain/mocks/user'
import { mockInsertEquip } from '../../domain/mocks/equipment'

describe('Account Routes', () => {
  beforeAll(async () => {
    jest.setTimeout(30 * 1000)
    await deleteAll(testConnection, 'User')
    await deleteAll(testConnection, 'company')
  })

  afterAll(() => {
    testConnection.end()
    connection.end()
    jest.setTimeout(10 * 1000)
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('POST - /signup', () => {
    test('Should return 200 on signup success', async () => {
      await mockInsertEquip()
      const httpRequest = await makeFakeRequestUserAdm()
      await request(app1)
        .post('/api/signup')
        .send(httpRequest.body)
        .expect(200)
    })
  })

  describe('POST - /user', () => {
    test('Should return 200 on add user success', async () => {
      const httpRequest = await makeFakeRequest()
      const accessToken = await mockAccessToken()
      await request(app1)
        .post('/api/user')
        .send(
          httpRequest.body
        )
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('POST - /login', () => {
    test('Should return 200 on login success', async () => {
      await deleteAll(testConnection, 'User')
      await mockInsertEquip()
      const httpRequest = await makeFakeRequestUserAdm()
      const httpRequestLogin = await makeFakeRequestLogin()
      await request(app1)
        .post('/api/signup')
        .send(httpRequest.body)
      await request(app1)
        .post('/api/login')
        .send(httpRequestLogin.body)
        .expect(200)
    })

    test('Should return 401 if login fails', async () => {
      const httpRequest = await makeFakeRequestInvalidLogin()
      await request(app1)
        .post('/api/login')
        .send(httpRequest.body)
        .expect(401)
    })
  })

  describe('GET - /loadUser', () => {
    test('', async () => {
      const httpRequest = await makeFakeRequestUserAdm()
      await mockInsertEquip()
      await request(app1)
        .post('/api/signup')
        .send(httpRequest.body)
    })
  })

  describe('ActivateUser Routes', () => {
    afterAll(() => {
      testConnection.end()
      connection.end()
    })

    const testConnection = mysql.createPool(env.dbTest)
    const app1 = express()
    setUpMiddlewares(app1)
    setUpRoutes(app1, testConnection)

    describe('PUT - /activate', () => {
      test('Should return 200 on activate  success', async () => {
        const activateToken = mockActivateTokenRequest()
        await mockInsertUser()
        await request(app1)
          .put('/api/activate')
          .send(activateToken.body)
          .expect(204)
      })
    })
  })

  describe('PUT - /editUser', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockUpdateUserRequest()
      await request(app1)
        .put('/api/editUser')
        .send(httpRequest.body)
        .expect(403)
    })
    test('Should return 200 on edit success', async () => {
      const httpRequest = await mockUpdateUserRequest()
      const accessToken = await mockAccessToken(httpRequest.body.user.id)
      await request(app1)
        .put('/api/editUser')
        .set('x-access-token', accessToken)
        .send(httpRequest.body)
        .expect(200)
    })
  })

  describe('GET - /company/:id/user', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const user = await mockInsertUser()
      await request(app1)
        .get(`/api/company/${user.idCompany}/user`)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const user = await mockInsertUser()
      const accessToken = await mockAccessToken()
      await request(app1)
        .get(`/api/company/${user.idCompany}/user`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('DELETE - /user/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const user = await mockInsertUser()
      await request(app1)
        .delete(`/api/user/${user.idUser}`)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .delete(`/api/user/${1}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('GET - /load/user/:corporateName', () => {
    test('Should return 204 if not return user', async () => {
      await deleteAll(testConnection, 'User')
      await request(app1)
        .get(`/api/load/user/${'invalid_name'}`)
        .expect(204)
    })

    test('Should return 200 if returning user', async () => {
      await mockInsertUser()
      await request(app1)
        .get(`/api/load/user/${'valid_name'}`)
        .expect(200)
    })
  })
})
