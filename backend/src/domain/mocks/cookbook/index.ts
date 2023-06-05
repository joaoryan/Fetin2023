/* eslint-disable no-undef */
import { deleteAll, insertOne } from '../../../infra/db/mysql/mysql-helper'
import env from '../../../main/config/env'
import mysql from 'mysql'
import { RecipeCookbookModel } from '../../models/recipe-cookbook'
import { mockInsertCompany } from '../user'
import { HttpRequest } from '../../../presentation/protocols'
import { AddCookbook, AddCookbookModel } from '../../usecases/add-cookbook'
import { UpdateCookbook, UpdateCookbookModel } from '../../usecases/update-cookbook'

afterAll(() => {
  testConnection.end()
})

const testConnection = mysql.createPool(env.dbTest)

// Cookbook

export const mockCookbookModel = (companyId: number): RecipeCookbookModel => (
  {
    equipTypeId: 1,
    recipeName: 'recipeName',
    recipeImage: 'recipeImage',
    creationDate: '00-00-0000',
    createdBy: 1,
    lastUpdate: '00-00-0000',
    updatedBy: 1,
    ingredientType: 1,
    dishType: 1,
    ingredients: 'ingredients',
    instructions: 'instructions',
    weight: 1,
    entryTemp: 1,
    companyId: companyId,
    menuId: 1,
    language: 1,
    origin: 'origin',
    preHeatTemp: 1
  }
)

export const mockInsertCookbook = async (): Promise<{ idCookbook: number, idCompany: number }> => {
  const company = await mockInsertCompany()
  await deleteAll(testConnection, 'cookbookRecipe')
  const cookbookResult = await insertOne(testConnection, 'cookbookRecipe', mockCookbookModel(company.idCompany))
  return { idCookbook: cookbookResult.insertId, idCompany: company.idCompany }
}

export const mockAddCookbook = async (): Promise<AddCookbookModel> => {
  const company = await mockInsertCompany()
  const cookbookResult = mockCookbookModel(company.idCompany)
  return cookbookResult
}

export const mockUpdateCookbook = async (): Promise<UpdateCookbookModel> => {
  const cookbook = await mockInsertCookbook()
  const cookbookResult = Object.assign(mockCookbookModel(cookbook.idCompany), { id: cookbook.idCookbook })
  return cookbookResult
}

export const mockReturnCookbook = (): RecipeCookbookModel => (Object.assign(mockCookbookModel(1), { id: 1 }))

export const mockAddCookbookRequest = async (): Promise<AddCookbook.Request> => {
  const cookbookResult = await mockAddCookbook()
  const httpRequest = {
    body: {
      cookbook: cookbookResult
    }
  }
  return httpRequest
}

export const mockUpdateCookbookRequest = async (): Promise<UpdateCookbook.Request> => {
  const cookbookResult = await mockUpdateCookbook()
  const httpRequest = {
    body: {
      cookbook: cookbookResult
    },
    params: {
      id: cookbookResult.id
    }
  }
  return httpRequest
}

export const mockLoadCookbookRequest = async (): Promise<HttpRequest> => {
  const cookbook = await mockInsertCookbook()
  const httpRequest = {
    params: {
      id: cookbook.idCompany
    }
  }
  return httpRequest
}

export const mockDeleteCookbookRequest = async (): Promise<HttpRequest> => {
  const cookbook = await mockInsertCookbook()
  const httpRequest = {
    body: {
      cookbook: [{
        id: cookbook.idCookbook,
        equipType: 1
      }]
    }
  }
  return httpRequest
}
