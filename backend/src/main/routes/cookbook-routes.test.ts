/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { mockAddCookbookRequest, mockDeleteCookbookRequest, mockInsertCookbook, mockUpdateCookbookRequest } from '../../domain/mocks/cookbook'
import { mockAccessToken } from '../../domain/mocks/user'

describe('Recipe Routes', () => {
  beforeAll(() => jest.setTimeout(30 * 1000))

  afterAll(() => {
    testConnection.end()
    connection.end()
    jest.setTimeout(10 * 1000)
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('GET - /company/:id/cookbook', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const cookbook = await mockInsertCookbook()
      await request(app1)
        .get(`/api/company/${cookbook.idCompany}/cookbook`)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const cookbook = await mockInsertCookbook()
      await request(app1)
        .get(`/api/company/${cookbook.idCompany}/cookbook`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('POST - /cookbook', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockAddCookbookRequest()
      await request(app1)
        .post('/api/cookbook')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockAddCookbookRequest()
      await request(app1)
        .post('/api/cookbook')
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(201)
    })
  })

  describe('PUT - /cookbook/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockUpdateCookbookRequest()
      await request(app1)
        .put(`/api/cookbook/${httpRequest.params.id}`)
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockUpdateCookbookRequest()
      await request(app1)
        .put(`/api/cookbook/${httpRequest.params.id}`)
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })
  })

  describe('DELETE - /cookbook/array', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockDeleteCookbookRequest()
      await request(app1)
        .delete('/api/cookbook/array')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockDeleteCookbookRequest()
      await request(app1)
        .delete('/api/cookbook/array')
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })
  })
})
