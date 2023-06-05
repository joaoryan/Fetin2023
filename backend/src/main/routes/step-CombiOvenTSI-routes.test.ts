/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { mockAddStepCombiOvenTSIRequest, mockInsertStepCombiOvenTSI, mockUpdateStepCombiOvenTSIRequest } from '../../domain/mocks/menus'
import { mockAccessToken } from '../../domain/mocks/user'

describe('StepCombiOvenTSI routes', () => {
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

  describe('POST - /stepCombiOvenTSI', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockAddStepCombiOvenTSIRequest()
      await request(app1)
        .post('/api/stepCombiOvenTSI')
        .send(httpRequest.body)
        .expect(403)
    })
    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockAddStepCombiOvenTSIRequest()
      await request(app1)
        .post('/api/stepCombiOvenTSI')
        .set('x-access-token', accessToken)
        .send(httpRequest.body)
        .expect(201)
    })
  })

  describe('DELETE - /stepCombiOvenTSI/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const stepCombiOvenTSIReturn = await mockInsertStepCombiOvenTSI()
      await request(app1)
        .delete(`/api/stepCombiOvenTSI/${stepCombiOvenTSIReturn.idStep}`)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const stepCombiOvenTSIReturn = await mockInsertStepCombiOvenTSI()
      await request(app1)
        .delete(`/api/stepCombiOvenTSI/${stepCombiOvenTSIReturn.idStep}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('PUT - /stepCombiOvenTSI/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
      await request(app1)
        .put('/api/stepCombiOvenTSI/1')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockUpdateStepCombiOvenTSIRequest()
      await request(app1)
        .put(`/api/stepCombiOvenTSI/${httpRequest.params.id}`)
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })
  })

  describe('GET - /:stepFrom/recipe/:recipeId/stepCombiOvenTSI', () => {
    test('Should return 200 on get recipe stepsCombiOvenTSI success', async () => {
      const accessToken = await mockAccessToken()
      const stepCombiOvenTSIReturn = await mockInsertStepCombiOvenTSI()
      await request(app1)
        .get(`/api/${'fromCookbook'}/recipe/${stepCombiOvenTSIReturn.idRecipe}/stepsCombiOvenTSI`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if load stepsCombiOvenTSI fails', async () => {
      const stepCombiOvenTSIReturn = await mockInsertStepCombiOvenTSI()
      await request(app1)
        .get(`/api/fromCookbook/recipe/${stepCombiOvenTSIReturn.idRecipe}/stepsCombiOvenTSI`)
        .expect(403)
    })
  })
})
