/* eslint-disable no-undef */
import { StepCombiOvenTSIMySqlRepository } from './step-CombiOvenTSI-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { getOne } from '../mysql-helper'
import { StepCombiOvenTSIModel } from '../../../../domain/models/stepCombiOvenTSI'
import { mockAddStepCombiOvenTSI, mockInsertStepCombiOvenTSI, mockUpdateStepCombiOvenTSI } from '../../../../domain/mocks/menus'

describe('StepCombiOvenTSI MySql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new StepCombiOvenTSIMySqlRepository(testConnection)

  test('Should Create a StepCombiOvenTSI on success', async () => {
    const stepCombiOvenTSIResult = await mockAddStepCombiOvenTSI()
    const result = await sut.addStepCombiOvenTSI(stepCombiOvenTSIResult)
    expect(result).toBeTruthy()
  })

  test('Should Update a StepCombiOvenTSI on success', async () => {
    const stepCombiOvenTSIResult = await mockUpdateStepCombiOvenTSI()
    const result = await sut.updateStepCombiOvenTSI(stepCombiOvenTSIResult.id, stepCombiOvenTSIResult)
    expect(result).toBeTruthy()
  })

  test('Should delete a StepCombiOvenTSI on success', async () => {
    const stepCombiOvenTSIResult = await mockInsertStepCombiOvenTSI()
    await sut.deleteStepCombiOvenTSI(stepCombiOvenTSIResult.idStep)
    const result = await getOne(testConnection, 'stepCombiOvenTSI', 'id', stepCombiOvenTSIResult.idStep)
    expect(result).toEqual([])
  })

  test('Should load a StepCombiOvenTSI on success', async () => {
    const stepCombiOvenTSIResult = await mockInsertStepCombiOvenTSI()
    const result: StepCombiOvenTSIModel[] = await sut.loadStepCombiOvenTSI(stepCombiOvenTSIResult.idRecipe)
    expect(result).toBeTruthy()
  })
})
