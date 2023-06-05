/* eslint-disable no-undef */
import { describe, test, afterAll, beforeEach } from '@jest/globals'
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { deleteAll } from '../../infra/db/mysql/mysql-helper'
import { mockAccessToken } from '../../domain/mocks/user'

describe('Download Update Routes', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  beforeEach(async () => {
    await deleteAll(testConnection, 'User')
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('GET - /download/updateFile/:ovenModel', () => {
    test('Should return 403 error if not a user', async () => {
      await request(app1)
        .get('/api/download/updateFile/TEST')
        .expect(403)
    })

    test('should return 204 for invalid parameters', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .get('/api/download/updateFile/INVALID')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
