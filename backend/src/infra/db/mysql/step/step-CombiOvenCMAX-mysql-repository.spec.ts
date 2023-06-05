/* eslint-disable no-undef */
import { StepCombiOvenCMAXMySqlRepository } from './step-CombiOvenCMAX-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { getOne } from '../mysql-helper'
import { StepCombiOvenCMAXModel } from '../../../../domain/models/stepCombiOvenCMAX'
import { mockAddStepCombiOvenCMAX, mockInsertStepCombiOvenCMAX, mockUpdateStepCombiOvenCMAX } from '../../../../domain/mocks/menus'

describe('StepCombiOvenCMAX MySql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new StepCombiOvenCMAXMySqlRepository(testConnection)

  test('Should Create a StepCombiOvenCMAX on success', async () => {
    const stepCombiOvenCMAXResult = await mockAddStepCombiOvenCMAX()
    const result = await sut.addStepCombiOvenCMAX(stepCombiOvenCMAXResult)
    expect(result).toBeTruthy()
  })

  test('Should Update a StepCombiOvenCMAX on success', async () => {
    const stepCombiOvenCMAXResult = await mockUpdateStepCombiOvenCMAX()
    const result = await sut.updateStepCombiOvenCMAX(stepCombiOvenCMAXResult.id, stepCombiOvenCMAXResult)
    expect(result).toBeTruthy()
  })

  test('Should delete a StepCombiOvenCMAX on success', async () => {
    const stepCombiOvenCMAXResult = await mockInsertStepCombiOvenCMAX()
    await sut.deleteStepCombiOvenCMAX(stepCombiOvenCMAXResult.idStep)
    const result = await getOne(testConnection, 'stepCombiOvenCMAX', 'id', stepCombiOvenCMAXResult.idStep)
    expect(result).toEqual([])
  })

  test('Should load a StepCombiOvenCMAX on success', async () => {
    const stepCombiOvenCMAXResult = await mockInsertStepCombiOvenCMAX()
    const result: StepCombiOvenCMAXModel[] = await sut.loadStepCombiOvenCMAX(stepCombiOvenCMAXResult.idRecipeCmax)
    expect(result).toBeTruthy()
  })
})
