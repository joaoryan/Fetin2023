/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { mockAddStepCombiOvenCMAXRequest, mockInsertStepCombiOvenCMAX, mockUpdateStepCombiOvenCMAXRequest } from '../../domain/mocks/menus'
import { mockAccessToken } from '../../domain/mocks/user'

describe('StepCombiOvenCMAX routes', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  describe('POST - /stepCombiOvenCMAX', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockAddStepCombiOvenCMAXRequest()
      await request(app1)
        .post('/api/stepCombiOvenCMAX')
        .send(httpRequest.body)
        .expect(403)
    })
    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockAddStepCombiOvenCMAXRequest()
      await request(app1)
        .post('/api/stepCombiOvenCMAX')
        .set('x-access-token', accessToken)
        .send(httpRequest.body)
        .expect(201)
    })
  })

  describe('DELETE - /stepCombiOvenCMAX/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const stepCombiOvenCMAXReturn = await mockInsertStepCombiOvenCMAX()
      await request(app1)
        .delete(`/api/stepCombiOvenCMAX/${stepCombiOvenCMAXReturn.idStep}`)
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const stepCombiOvenCMAXReturn = await mockInsertStepCombiOvenCMAX()
      await request(app1)
        .delete(`/api/stepCombiOvenCMAX/${stepCombiOvenCMAXReturn.idStep}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('PUT - /stepCombiOvenCMAX/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
      await request(app1)
        .put('/api/stepCombiOvenCMAX/1')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 200 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockUpdateStepCombiOvenCMAXRequest()
      await request(app1)
        .put(`/api/stepCombiOvenCMAX/${httpRequest.params.id}`)
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })
  })

  describe('GET - /recipe/:recipeId/stepCombiOvenCMAX', () => {
    test('Should return 200 on get recipe stepsCombiOvenCMAX success', async () => {
      const accessToken = await mockAccessToken()
      const stepCombiOvenCMAXReturn = await mockInsertStepCombiOvenCMAX()
      await request(app1)
        .get(`/api/${'fromCookbook'}/recipe/${stepCombiOvenCMAXReturn.idRecipeCmax}/stepsCombiOvenCMAX`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if load stepsCombiOvenCMAX fails', async () => {
      const stepCombiOvenCMAXReturn = await mockInsertStepCombiOvenCMAX()
      await request(app1)
        .get(`/api/${'fromCookbook'}/recipe/${stepCombiOvenCMAXReturn.idRecipeCmax}/stepsCombiOvenCMAX`)
        .expect(403)
    })
  })
})
