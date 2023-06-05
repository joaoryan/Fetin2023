/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { connection } from '../config/app'
import setUpRoutes from '../config/routes'
import setUpMiddlewares from '../config/middlewares'
import env from '../config/env'
import mysql from 'mysql'
import { mockAddRecipeCmaxRequest, mockAddRecipeRequest, mockDeleteRecipeRequest, mockInsertRecipe, mockInsertRecipeCmax, mockUpdateRecipeCmaxRequest, mockUpdateRecipeRequest } from '../../domain/mocks/menus'
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

  describe('POST - /recipe', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockAddRecipeRequest()
      await request(app1)
        .post('/api/recipe')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockAddRecipeRequest()
      await request(app1)
        .post('/api/recipe')
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(201)
    })

    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockAddRecipeCmaxRequest()
      await request(app1)
        .post('/api/recipe')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 201 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockAddRecipeCmaxRequest()
      await request(app1)
        .post('/api/recipe')
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(201)
    })

    test('Should return 403 if nonem recipe is provided', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .post('/api/recipe')
        .set('x-access-token', accessToken)
        .send({})
        .expect(400)
    })
  })

  describe('PUT - /recipe/:id', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockUpdateRecipeRequest()
      await request(app1)
        .put(`/api/recipe/${httpRequest.body.recipe.id}`)
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided Cmax', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockUpdateRecipeRequest()
      await request(app1)
        .put(`/api/recipe/${httpRequest.body.recipe.id}`)
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })

    test('Should return 403 if no x-access-token is provided Cmax', async () => {
      const httpRequest = await mockUpdateRecipeCmaxRequest()
      await request(app1)
        .put(`/api/recipe/${httpRequest.body.recipe.id}`)
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided Cmax', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockUpdateRecipeCmaxRequest()
      await request(app1)
        .put(`/api/recipe/${httpRequest.body.recipe.id}`)
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })

    test('Should return 403 if nonem recipe is provided', async () => {
      const accessToken = await mockAccessToken()
      await request(app1)
        .put('/api/recipe/1')
        .set('x-access-token', accessToken)
        .send({})
        .expect(400)
    })
  })

  describe('GET - /group/:id/recipe', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const recipeResult = await mockInsertRecipe()
      await request(app1)
        .get(`/api/group/${recipeResult.idGroup}/recipe`)
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const recipeResult = await mockInsertRecipe()
      await request(app1)
        .get(`/api/group/${recipeResult.idGroup}/recipe`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('GET - /menu/:id/recipeCmax', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const recipeResult = await mockInsertRecipeCmax()
      await request(app1)
        .get(`/api/menu/${recipeResult.idMenu}/recipeCmax`)
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const recipeResult = await mockInsertRecipeCmax()
      await request(app1)
        .get(`/api/menu/${recipeResult.idMenu}/recipeCmax`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('DELETE - /recipe/array', () => {
    test('Should return 403 if no x-access-token is provided', async () => {
      const httpRequest = await mockDeleteRecipeRequest()
      await request(app1)
        .delete('/api/recipe/array')
        .send(
          httpRequest.body
        )
        .expect(403)
    })

    test('Should return 204 if valid x-access-token is provided', async () => {
      const accessToken = await mockAccessToken()
      const httpRequest = await mockDeleteRecipeRequest()
      await request(app1)
        .delete('/api/recipe/array')
        .set('x-access-token', accessToken)
        .send(
          httpRequest.body
        )
        .expect(200)
    })
  })
})
