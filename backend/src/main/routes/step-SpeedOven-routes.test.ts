/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { mockAddStepSpeedOvenRequest, mockInsertStepSpeedOven, mockUpdateStepSpeedOvenRequest } from '../../domain/mocks/menus'
import { mockAccessToken } from '../../domain/mocks/user'

describe('StepSpeedOven routes', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('POST - /stepSpeedOven', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockAddStepSpeedOvenRequest()
      await request(app1)
        .post('/api/stepSpeedOven')
        .send(httpRequest.body)
        .expect(403)
    })
    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockAddStepSpeedOvenRequest()
      await request(app1)
        .post('/api/stepSpeedOven')
        .set('x-access-token', accessToken)
        .send(httpRequest.body)
        .expect(201)
    })
  })

  describe('GET - /stepSpeedOven/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      await request(app1)
        .get('/api/stepSpeedOven/1')
        .expect(403)
    })

    test('Should return 200 if on get a StepSpeedOven by id with success', async () => {
      const accessToken = await mockAccessToken()
      const stepSpeedOvenReturn = await mockInsertStepSpeedOven()
      await request(app1)
        .get(`/api/stepSpeedOven/${stepSpeedOvenReturn.idStepSpeedOven}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('DELETE - /stepSpeedOven/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const stepSpeedOvenReturn = await mockInsertStepSpeedOven()
      await request(app1)
        .delete(`/api/stepSpeedOven/${stepSpeedOvenReturn.idStepSpeedOven}`)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const stepSpeedOvenReturn = await mockInsertStepSpeedOven()
      await request(app1)
        .delete(`/api/stepSpeedOven/${stepSpeedOvenReturn.idStepSpeedOven}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('PUT - /stepSpeedOven/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockUpdateStepSpeedOvenRequest()
      await request(app1)
        .put('/api/stepSpeedOven/1')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockUpdateStepSpeedOvenRequest()
      await request(app1)
        .put(`/api/stepSpeedOven/${httpRequest.params.id}`)
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })
  })

  describe('GET - /recipe/:recipeId/stepSpeedOven', () => {
    test('Should return 200 on get recipe stepsSpeedOven success', async () => {
      const accessToken = await mockAccessToken()
      const stepSpeedOvenReturn = await mockInsertStepSpeedOven()
      await request(app1)
        .get(`/api/${'fromCookbook'}/recipe/${stepSpeedOvenReturn.idRecipe}/stepsSpeedOven`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if load stepsSpeedOven fails', async () => {
      const stepSpeedOvenReturn = await mockInsertStepSpeedOven()
      await request(app1)
        .get(`/api/fromCookbook/recipe/${stepSpeedOvenReturn.idRecipe}/stepsSpeedOven`)
        .expect(403)
    })
  })
})
