/* eslint-disable no-undef */
import { RecipeMySqlRepository } from './recipe-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { getOne } from '../mysql-helper'
import { RecipeCMAXModel } from '../../../../domain/models/recipeCMAX'
import { StepSpeedOvenModel } from '../../../../domain/models/stepSpeedOven'
import { StepCombiOvenTSIModel } from '../../../../domain/models/stepCombiOvenTSI'
import { StepCombiOvenCMAXModel } from '../../../../domain/models/stepCombiOvenCMAX'
import { RecipeModel } from '../../../../domain/models/recipe'
import { mockAddRecipe, mockAddRecipeCmax, mockInsertStepCombiOvenCMAX, mockInsertStepCombiOvenTSI, mockInsertRecipe, mockInsertRecipeCmax, mockInsertStepSpeedOven } from '../../../../domain/mocks/menus'

describe('Recipe Mysql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })
  const testConnection = mysql.createPool(env.dbTest)
  const sut = new RecipeMySqlRepository(testConnection)

  test('Should load array recipe c-max on success', async () => {
    const recipeCmaxResult = await mockInsertRecipeCmax()
    const result: RecipeCMAXModel[] = await sut.loadRecipeCMAX(recipeCmaxResult.idMenu)
    expect(result).toBeTruthy()
  })

  test('Should load array recipe on success', async () => {
    const recipeResult = await mockInsertRecipe()
    const result: RecipeModel[] = await sut.loadRecipe(recipeResult.idMenu)
    expect(result).toBeTruthy()
  })

  test('Should loadStepSpeedOven on success', async () => {
    const stepResult = await mockInsertStepSpeedOven()
    const result: StepSpeedOvenModel[] = await sut.loadStepSpeedOven(stepResult.idRecipe)
    expect(result).toBeTruthy()
  })

  test('Should loadStepCombiOvenTSI on success', async () => {
    const stepResult = await mockInsertStepCombiOvenTSI()
    const result: StepCombiOvenTSIModel[] = await sut.loadStepCombiOvenTSI(stepResult.idRecipe)
    expect(result).toBeTruthy()
  })

  test('Should loadStepCombiOvenCMAX on success', async () => {
    const stepResult = await mockInsertStepCombiOvenCMAX()
    const result: StepCombiOvenCMAXModel[] = await sut.loadStepCombiOvenCMAX(stepResult.idRecipeCmax)
    expect(result).toBeTruthy()
  })

  test('Should delete recipen c-max on success', async () => {
    const recipeResult = await mockInsertRecipeCmax()
    await sut.deleteRecipeCMAX(recipeResult.idRecipeCmax)
    const result = await getOne(testConnection, 'cmaxRecipe', 'id', recipeResult.idRecipeCmax)
    expect(result).toEqual([])
  })

  test('Should delete recipe on success', async () => {
    const recipeResult = await mockInsertRecipe()
    await sut.deleteRecipe(recipeResult.idRecipe)
    const result = await getOne(testConnection, 'recipe', 'id', recipeResult.idRecipe)
    expect(result).toEqual([])
  })

  test('Should delete menu step SpeedOven on success', async () => {
    const stepResult = await mockInsertStepSpeedOven()
    await sut.deleteSpeedOven(stepResult.idStepSpeedOven)
    const result = await getOne(testConnection, 'stepSpeedOven', 'id', stepResult.idRecipe)
    expect(result).toEqual([])
  })

  test('Should delete menu step CombiOvenTSI on success', async () => {
    const stepResult = await mockInsertStepCombiOvenTSI()
    await sut.deleteCombiOvenTSI(stepResult.idStep)
    const result = await getOne(testConnection, 'stepCombiOvenTSI', 'id', stepResult.idRecipe)
    expect(result).toEqual([])
  })

  test('Should delete menu step CombiOvenCMAX on success', async () => {
    const stepResult = await mockInsertStepCombiOvenCMAX()
    await sut.deleteCombiOvenCMAX(stepResult.idStep)
    const result = await getOne(testConnection, 'stepCombiOvenCMAX', 'id', stepResult.idRecipeCmax)
    expect(result).toEqual([])
  })

  test('Should return recipe on add success', async () => {
    const recipeResult = await mockAddRecipe()
    const result = await sut.addRecipe(recipeResult)
    expect(result).toBeTruthy()
  })

  test('Should return recipe c-max on add success', async () => {
    const recipeResult = await mockAddRecipeCmax()
    const result = await sut.addRecipeCMAX(recipeResult)
    expect(result).toBeTruthy()
  })

  test('Should loadRecipeById on success', async () => {
    const recipeResult = await mockInsertRecipe()
    const result: RecipeModel = await sut.loadRecipeById(recipeResult.idRecipe)
    expect(result).toBeTruthy()
  })

  test('Should loadRecipeCMAX on success', async () => {
    const recipeCmaxResult = await mockInsertRecipeCmax()
    const result: RecipeCMAXModel = await sut.loadRecipeCMAXById(recipeCmaxResult.idRecipeCmax)
    expect(result).toBeTruthy()
  })
})
