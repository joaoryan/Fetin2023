/* eslint-disable no-undef */
import { StepSpeedOvenMySqlRepository } from './step-SpeedOven-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { getOne } from '../mysql-helper'
import { StepSpeedOvenModel } from '../../../../domain/models/stepSpeedOven'
import { mockAddStepSpeedOven, mockInsertStepSpeedOven, mockUpdateStepSpeedOven } from '../../../../domain/mocks/menus'

describe('StepSpeedOven MySql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new StepSpeedOvenMySqlRepository(testConnection)

  test('Should Create a StepSpeedOven on success', async () => {
    const stepSpeedOvenResult = await mockAddStepSpeedOven()
    const result = await sut.addStepSpeedOven(stepSpeedOvenResult)
    expect(result).toBeTruthy()
  })

  test('Should Update a StepSpeedOven on success', async () => {
    const stepSpeedOvenResult = await mockUpdateStepSpeedOven()
    const result = await sut.updateStepSpeedOven(stepSpeedOvenResult.id, stepSpeedOvenResult)
    expect(result).toBeTruthy()
  })

  test('Should delete a StepSpeedOven on success', async () => {
    const stepSpeedOvenResult = await mockInsertStepSpeedOven()
    await sut.deleteStepSpeedOven(stepSpeedOvenResult.idStepSpeedOven)
    const result = await getOne(testConnection, 'stepSpeedOven', 'id', stepSpeedOvenResult.idStepSpeedOven)
    expect(result).toEqual([])
  })

  test('Should load recipe StepsSpeedOven on success', async () => {
    const stepSpeedOvenResult = await mockInsertStepSpeedOven()
    const result: StepSpeedOvenModel[] = await sut.loadStepsSpeedOvenByRecipeId(stepSpeedOvenResult.idRecipe)
    expect(result).toBeTruthy()
  })

  test('Should load a StepSpeedOven on success', async () => {
    const stepSpeedOvenResult = await mockInsertStepSpeedOven()
    const result: StepSpeedOvenModel = await sut.loadStepSpeedOvenById(stepSpeedOvenResult.idStepSpeedOven)
    expect(result).toBeTruthy()
  })
})
