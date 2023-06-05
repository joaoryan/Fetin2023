/* eslint-disable no-undef */
import { AddStepCombiOvenCMAXModel, StepCombiOvenCMAXModel, AddStepCombiOvenCMAXRepository } from './db-add-step-CombiOvenCMAX-protocols'
import { DbAddStepCombiOvenCMAX } from './db-add-step-CombiOvenCMAX'
import { mockAddStepCombiOvenCMAX, mockReturnStepCombiOvenCMAX } from '../../../domain/mocks/menus'

const makeAddStepCombiOvenCMAXRepository = (): AddStepCombiOvenCMAXRepository => {
  class AddStepCombiOvenCMAXRepositoryStub implements AddStepCombiOvenCMAXRepository {
    async addStepCombiOvenCMAX (stepCombiOvenCMAXData: AddStepCombiOvenCMAXModel): Promise<StepCombiOvenCMAXModel> {
      return new Promise(resolve => resolve(mockReturnStepCombiOvenCMAX()))
    }
  }
  return new AddStepCombiOvenCMAXRepositoryStub()
}

interface SutTypes {
  sut: DbAddStepCombiOvenCMAX
  addStepCombiOvenCMAXRepositoryStub: AddStepCombiOvenCMAXRepository
}

const makeSut = (): SutTypes => {
  const addStepCombiOvenCMAXRepositoryStub = makeAddStepCombiOvenCMAXRepository()
  const sut = new DbAddStepCombiOvenCMAX(addStepCombiOvenCMAXRepositoryStub)
  return {
    sut,
    addStepCombiOvenCMAXRepositoryStub
  }
}

describe('DbAddStepCombiOvenCMAX Usecase', () => {
  test('Should call AddStepCombiOvenCMAXRepository with correct values', async () => {
    const { sut, addStepCombiOvenCMAXRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addStepCombiOvenCMAXRepositoryStub, 'addStepCombiOvenCMAX')
    const stepCombiOvenCMAX = await mockAddStepCombiOvenCMAX()
    await sut.addStepCombiOvenCMAX(stepCombiOvenCMAX)
    expect(addSpy).toHaveBeenCalledWith(stepCombiOvenCMAX)
  })

  test('Should throw if AddStepCombiOvenCMAXRepository throws', async () => {
    const { sut, addStepCombiOvenCMAXRepositoryStub } = makeSut()
    jest.spyOn(addStepCombiOvenCMAXRepositoryStub, 'addStepCombiOvenCMAX').mockRejectedValue(new Error())
    const stepCombiOvenCMAX = await mockAddStepCombiOvenCMAX()
    const promise = sut.addStepCombiOvenCMAX(stepCombiOvenCMAX)
    await expect(promise).rejects.toThrow()
  })
})
