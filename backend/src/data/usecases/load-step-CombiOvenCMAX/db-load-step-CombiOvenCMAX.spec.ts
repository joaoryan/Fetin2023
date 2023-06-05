/* eslint-disable no-undef */
import { DbLoadStepCombiOvenCMAX } from './db-load-step-CombiOvenCMAX'
import { LoadStepCombiOvenCMAX, StepCombiOvenCMAXModel, LoadStepCombiOvenCMAXRepository } from './db-load-step-CombiOvenCMAX-protocols'
import { mockInsertStepCombiOvenCMAX, mockReturnStepCombiOvenCMAX } from '../../../domain/mocks/menus'

const makeLoadStepCombiOvenCMAXRepository = (): LoadStepCombiOvenCMAXRepository => {
  class StepCombiOvenCMAXStub implements LoadStepCombiOvenCMAXRepository {
    loadStepCombiOvenCMAX (idRecipe: number): Promise<StepCombiOvenCMAXModel[]> {
      return new Promise(resolve => resolve([mockReturnStepCombiOvenCMAX()]))
    }
  }
  return new StepCombiOvenCMAXStub()
}

interface SutTypes {
  sut: LoadStepCombiOvenCMAX
  stepCombiOvenCMAXStub: LoadStepCombiOvenCMAXRepository
}

const makeSut = (): SutTypes => {
  const stepCombiOvenCMAXStub = makeLoadStepCombiOvenCMAXRepository()
  const sut = new DbLoadStepCombiOvenCMAX(stepCombiOvenCMAXStub)
  return {
    sut,
    stepCombiOvenCMAXStub
  }
}

describe('DbLoadStepCombiOvenCMAX Usecase', () => {
  test('Should call loadStepCombiOvenCMAX with correct values', async () => {
    const { sut, stepCombiOvenCMAXStub } = makeSut()
    const addSpy = jest.spyOn(stepCombiOvenCMAXStub, 'loadStepCombiOvenCMAX')
    const stepResult = await mockInsertStepCombiOvenCMAX()
    await sut.loadStepCombiOvenCMAX(stepResult.idRecipeCmax)
    expect(addSpy).toHaveBeenCalledWith(stepResult.idRecipeCmax)
  })

  test('Should throw if loadStepCombiOvenCMAX thows', async () => {
    const { sut, stepCombiOvenCMAXStub } = makeSut()
    jest.spyOn(stepCombiOvenCMAXStub, 'loadStepCombiOvenCMAX').mockRejectedValue(new Error())
    const promise = sut.loadStepCombiOvenCMAX(1)
    await expect(promise).rejects.toThrow()
  })
})
