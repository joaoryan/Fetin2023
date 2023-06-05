/* eslint-disable no-undef */
import { CookbookMySqlRepository } from './cookbook-mysql-repository'
import env from '../../../../main/config/env'
import mysql from 'mysql'
import { RecipeCookbookModel } from '../../../../domain/models/recipe-cookbook'
import { mockAddCookbook, mockInsertCookbook, mockUpdateCookbook } from '../../../../domain/mocks/cookbook'
import { getOne } from '../mysql-helper'

describe('Cookbook Mysql Repository', () => {
  afterAll(async () => {
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new CookbookMySqlRepository(testConnection)

  describe('AddCookbook method tests', () => {
    test('should add a cookbook on success', async () => {
      const cookbook = await mockAddCookbook()
      const createdCookbook = await sut.addCookbook(cookbook)
      expect(createdCookbook).toBeTruthy()
    })
  })

  describe('LoadRecipeCookbook method tests', () => {
    test('Should loadRecipeCookbook on success', async () => {
      const cookbookResult = await mockInsertCookbook()
      const result: RecipeCookbookModel[] = await sut.loadRecipeCookbook(cookbookResult.idCompany)
      expect(result).toBeTruthy()
    })
  })

  describe('UpdateCookbook method tests', () => {
    test('should update a cookbook successfully', async () => {
      const cookbook = await mockUpdateCookbook()
      const result = await sut.updateCookbook(cookbook.id, cookbook)
      expect(result).toBeTruthy()
    })
    test('should return false if the id does not exist in the database', async () => {
      const cookbook = await mockUpdateCookbook()
      const result = await sut.updateCookbook(1234, cookbook)
      expect(result).toBeFalsy()
    })
  })

  describe('DeleteCookbook method tests', () => {
    test('should delete a cookbook successfully', async () => {
      const cookbookResult = await mockInsertCookbook()
      const deleteResult = await sut.deleteCookbook(cookbookResult.idCookbook)
      expect(deleteResult).toBeTruthy()
      const getResult = await getOne(testConnection, 'cookbookRecipe', 'id', cookbookResult.idCookbook)
      expect(getResult).toEqual([])
    })
    test('should return false if no rows are affected', async () => {
      const result = await sut.deleteCookbook(1234)
      expect(result).toBeFalsy()
    })
  })
})
