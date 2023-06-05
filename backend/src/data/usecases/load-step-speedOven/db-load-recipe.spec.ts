/* eslint-disable no-undef */
import { mockInsertStepSpeedOven, mockReturnStepSpeedOven } from '../../../domain/mocks/menus'
import { DbLoadStepSpeedOven } from './db-load-stepSpeedOven'
import { LoadStepSpeedOven, StepSpeedOvenModel, LoadStepSpeedOvenRepository } from './db-load-stepSpeedOven-protocols'

const makeLoadStepSpeedOvenRepository = (): LoadStepSpeedOvenRepository => {
  class StepSpeedOvenModelStub implements LoadStepSpeedOvenRepository {
    async loadStepSpeedOven (idRecipe: number): Promise<StepSpeedOvenModel[]> {
      return new Promise(resolve => resolve([mockReturnStepSpeedOven()]))
    }
  }
  return new StepSpeedOvenModelStub()
}

interface SutTypes {
  sut: LoadStepSpeedOven
  stepSpeedOvenModelStub: LoadStepSpeedOvenRepository
}

const makeSut = (): SutTypes => {
  const stepSpeedOvenModelStub = makeLoadStepSpeedOvenRepository()
  const sut = new DbLoadStepSpeedOven(stepSpeedOvenModelStub)
  return {
    sut,
    stepSpeedOvenModelStub
  }
}

describe('DbLoadStepSpeedOven Usecase', () => {
  test('Should call LoadStepSpeedOvenRepository with correct values', async () => {
    const { sut, stepSpeedOvenModelStub } = makeSut()
    const addSpy = jest.spyOn(stepSpeedOvenModelStub, 'loadStepSpeedOven')
    const stepResult = await mockInsertStepSpeedOven()
    await sut.loadStepSpeedOven(stepResult.idRecipe)
    expect(addSpy).toHaveBeenCalledWith(stepResult.idRecipe)
  })

  test('Should throw if LoadStepSpeedOvenRepository thows', async () => {
    const { sut, stepSpeedOvenModelStub } = makeSut()
    jest.spyOn(stepSpeedOvenModelStub, 'loadStepSpeedOven').mockRejectedValue(new Error())
    const promise = sut.loadStepSpeedOven(1)
    await expect(promise).rejects.toThrow()
  })
})
