/* eslint-disable no-undef */
import { AddStepSpeedOvenModel, StepSpeedOvenModel, AddStepSpeedOvenRepository } from './db-add-step-SpeedOven-protocols'
import { DbAddStepSpeedOven } from './db-add-step-SpeedOven'
import { mockAddStepSpeedOven, mockReturnStepSpeedOven } from '../../../domain/mocks/menus'

const makeAddStepSpeedOvenRepository = (): AddStepSpeedOvenRepository => {
  class AddStepSpeedOvenRepositoryStub implements AddStepSpeedOvenRepository {
    async addStepSpeedOven (stepSpeedOvenData: AddStepSpeedOvenModel): Promise<StepSpeedOvenModel> {
      return new Promise(resolve => resolve(mockReturnStepSpeedOven()))
    }
  }
  return new AddStepSpeedOvenRepositoryStub()
}

interface SutTypes {
  sut: DbAddStepSpeedOven
  addStepSpeedOvenRepositoryStub: AddStepSpeedOvenRepository
}

const makeSut = (): SutTypes => {
  const addStepSpeedOvenRepositoryStub = makeAddStepSpeedOvenRepository()
  const sut = new DbAddStepSpeedOven(addStepSpeedOvenRepositoryStub)
  return {
    sut,
    addStepSpeedOvenRepositoryStub
  }
}

describe('DbAddStepSpeedOven Usecase', () => {
  test('Should call AddStepSpeedOvenRepository with correct values', async () => {
    const { sut, addStepSpeedOvenRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addStepSpeedOvenRepositoryStub, 'addStepSpeedOven')
    const stepSpeedOven = await mockAddStepSpeedOven()
    await sut.addStepSpeedOven(stepSpeedOven)
    expect(addSpy).toHaveBeenCalledWith(stepSpeedOven)
  })

  test('Should throw if AddStepSpeedOvenRepository throws', async () => {
    const { sut, addStepSpeedOvenRepositoryStub } = makeSut()
    jest.spyOn(addStepSpeedOvenRepositoryStub, 'addStepSpeedOven').mockRejectedValue(new Error())
    const stepSpeedOven = await mockAddStepSpeedOven()
    const promise = sut.addStepSpeedOven(stepSpeedOven)
    await expect(promise).rejects.toThrow()
  })
})
