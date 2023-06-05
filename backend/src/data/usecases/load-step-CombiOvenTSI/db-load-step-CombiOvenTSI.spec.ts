/* eslint-disable no-undef */
import { DbLoadStepCombiOvenTSI } from './db-load-step-CombiOvenTSI'
import { LoadStepCombiOvenTSI, StepCombiOvenTSIModel, LoadStepCombiOvenTSIRepository } from './db-load-step-CombiOvenTSI-protocols'
import { mockInsertStepCombiOvenTSI, mockReturnStepCombiOvenTSI } from '../../../domain/mocks/menus'

const makeLoadStepCombiOvenTSIRepository = (): LoadStepCombiOvenTSIRepository => {
  class StepCombiOvenTSIStub implements LoadStepCombiOvenTSIRepository {
    loadStepCombiOvenTSI (idRecipe: number): Promise<StepCombiOvenTSIModel[]> {
      return new Promise(resolve => resolve([mockReturnStepCombiOvenTSI()]))
    }
  }
  return new StepCombiOvenTSIStub()
}

interface SutTypes {
  sut: LoadStepCombiOvenTSI
  stepCombiOvenTSIStub: LoadStepCombiOvenTSIRepository
}

const makeSut = (): SutTypes => {
  const stepCombiOvenTSIStub = makeLoadStepCombiOvenTSIRepository()
  const sut = new DbLoadStepCombiOvenTSI(stepCombiOvenTSIStub)
  return {
    sut,
    stepCombiOvenTSIStub
  }
}

describe('DbLoadStepCombiOvenTSI Usecase', () => {
  test('Should call loadStepCombiOvenTSI with correct values', async () => {
    const { sut, stepCombiOvenTSIStub } = makeSut()
    const addSpy = jest.spyOn(stepCombiOvenTSIStub, 'loadStepCombiOvenTSI')
    const stepResult = await mockInsertStepCombiOvenTSI()
    await sut.loadStepCombiOvenTSI(stepResult.idRecipe)
    expect(addSpy).toHaveBeenCalledWith(stepResult.idRecipe)
  })

  test('Should throw if loadStepCombiOvenTSI thows', async () => {
    const { sut, stepCombiOvenTSIStub } = makeSut()
    jest.spyOn(stepCombiOvenTSIStub, 'loadStepCombiOvenTSI').mockRejectedValue(new Error())
    const promise = sut.loadStepCombiOvenTSI(1)
    await expect(promise).rejects.toThrow()
  })
})
