/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { mockAddGroupRequest, mockDeleteGroupRequest, mockInsertGroup, mockUpdateGroupRequest } from '../../domain/mocks/menus'
import { mockAccessToken } from '../../domain/mocks/user'

describe('Group Routes', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('POST - /group', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockAddGroupRequest()
      await request(app1)
        .post('/api/group')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockAddGroupRequest()
      await request(app1)
        .post('/api/group')
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(201)
    })
  })

  describe('PUT - /group/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockUpdateGroupRequest()
      await request(app1)
        .put(`/api/group/${httpRequest.body.group.id}`)
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockUpdateGroupRequest()
      await request(app1)
        .put(`/api/group/${httpRequest.body.group.id}`)
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })
  })

  describe('DELETE - /group/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockDeleteGroupRequest()
      await request(app1)
        .delete(`/api/group/${httpRequest.params.id}`)
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockDeleteGroupRequest()
      await request(app1)
        .delete(`/api/group/${httpRequest.params.id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('GET - /menu/:menuId/group', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      await request(app1)
        .get('/api/menu/1/group/')
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const resultGroup = await mockInsertGroup()
      await request(app1)
        .get(`/api/menu/${resultGroup.idMenu}/group`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
