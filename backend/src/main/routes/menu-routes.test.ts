/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { mockAddMenuRequest, mockInsertMenu, mockInsertStepSpeedOven, mockUpdateMenuRequest } from '../../domain/mocks/menus'
import { mockAccessToken } from '../../domain/mocks/user'

describe('Menu Routes', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('POST - /menu', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockAddMenuRequest()
      await request(app1)
        .post('/api/menu')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockAddMenuRequest()
      await request(app1)
        .post('/api/menu')
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(201)
    })
  })

  describe('GET - /menu/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      await request(app1)
        .get('/api//menu/1')
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const menuResult = await mockInsertStepSpeedOven()
      await request(app1)
        .get(`/api/menu/${menuResult.idMenu}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('GET - /company/:companyId/menu', () => {
    test('Should return 200 on get user menus success', async () => {
      const accessToken = await mockAccessToken()
      const menuReturn = await mockInsertMenu()
      await request(app1)
        .get(`/api/company/${menuReturn.idCompany}/menu`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if load company fails', async () => {
      const menuReturn = await mockInsertMenu()
      await request(app1)
        .get(`/api/company/${menuReturn.idCompany}/menu`)
        .expect(403)
    })
  })

  describe('PUT - /menu/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockUpdateMenuRequest()
      await request(app1)
        .put('/api/menu/1')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockUpdateMenuRequest()
      await request(app1)
        .put(`/api/menu/${httpRequest.body.menu.id}`)
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })
  })

  describe('DELETE - /menu/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const menuReturn = await mockInsertMenu()
      await request(app1)
        .delete(`/api/menu/${menuReturn.idMenu}`)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const menuReturn = await mockInsertMenu()
      await request(app1)
        .delete(`/api/menu/${menuReturn.idMenu}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
