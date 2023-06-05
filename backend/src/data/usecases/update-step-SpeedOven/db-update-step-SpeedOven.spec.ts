/* eslint-disable no-undef */
import { DbUpdateStepSpeedOven } from './db-update-step-SpeedOven'
import { StepSpeedOvenModel, UpdateStepSpeedOvenRepository } from './db-update-step-SpeedOven-protocols'
import { mockUpdateStepSpeedOven } from '../../../domain/mocks/menus'

const makeUpdateStepSpeedOvenRepository = (): UpdateStepSpeedOvenRepository => {
  class UpdateStepSpeedOvenRepositoryStub implements UpdateStepSpeedOvenRepository {
    async updateStepSpeedOven (id: number, stepSpeedOvenData: StepSpeedOvenModel): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new UpdateStepSpeedOvenRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateStepSpeedOven
  updateStepSpeedOvenRepositoryStub: UpdateStepSpeedOvenRepository
}

const makeSut = (): SutTypes => {
  const updateStepSpeedOvenRepositoryStub = makeUpdateStepSpeedOvenRepository()
  const sut = new DbUpdateStepSpeedOven(updateStepSpeedOvenRepositoryStub)
  return {
    sut,
    updateStepSpeedOvenRepositoryStub
  }
}

describe('DbUpdateStepSpeedOven Usecase', () => {
  test('Should call UpdateStepSpeedOvenRepository with correct values', async () => {
    const { sut, updateStepSpeedOvenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateStepSpeedOvenRepositoryStub, 'updateStepSpeedOven')
    const stepSpeedOvenResult = await mockUpdateStepSpeedOven()
    await sut.updateStepSpeedOven(stepSpeedOvenResult.id, stepSpeedOvenResult)
    expect(updateSpy).toHaveBeenCalledWith(stepSpeedOvenResult.id, stepSpeedOvenResult)
  })

  test('Should throw if UpdateStepSpeedOvenRepository throws', async () => {
    const { sut, updateStepSpeedOvenRepositoryStub } = makeSut()
    jest.spyOn(updateStepSpeedOvenRepositoryStub, 'updateStepSpeedOven').mockRejectedValue(new Error())
    const stepSpeedOvenResult = await mockUpdateStepSpeedOven()
    const promise = sut.updateStepSpeedOven(stepSpeedOvenResult.id, stepSpeedOvenResult)
    await expect(promise).rejects.toThrow()
  })
})
