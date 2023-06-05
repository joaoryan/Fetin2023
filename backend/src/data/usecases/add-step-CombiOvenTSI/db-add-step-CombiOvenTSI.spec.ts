/* eslint-disable no-undef */
import { AddStepCombiOvenTSIModel, StepCombiOvenTSIModel, AddStepCombiOvenTSIRepository } from './db-add-step-CombiOvenTSI-protocols'
import { DbAddStepCombiOvenTSI } from './db-add-step-CombiOvenTSI'
import { mockAddStepCombiOvenTSI, mockReturnStepCombiOvenTSI } from '../../../domain/mocks/menus'

const makeAddStepCombiOvenTSIRepository = (): AddStepCombiOvenTSIRepository => {
  class AddStepCombiOvenTSIRepositoryStub implements AddStepCombiOvenTSIRepository {
    async addStepCombiOvenTSI (stepCombiOvenTSIData: AddStepCombiOvenTSIModel): Promise<StepCombiOvenTSIModel> {
      return new Promise(resolve => resolve(mockReturnStepCombiOvenTSI()))
    }
  }
  return new AddStepCombiOvenTSIRepositoryStub()
}

interface SutTypes {
  sut: DbAddStepCombiOvenTSI
  addStepCombiOvenTSIRepositoryStub: AddStepCombiOvenTSIRepository
}

const makeSut = (): SutTypes => {
  const addStepCombiOvenTSIRepositoryStub = makeAddStepCombiOvenTSIRepository()
  const sut = new DbAddStepCombiOvenTSI(addStepCombiOvenTSIRepositoryStub)
  return {
    sut,
    addStepCombiOvenTSIRepositoryStub
  }
}

describe('DbAddStepCombiOvenTSI Usecase', () => {
  test('Should call AddStepCombiOvenTSIRepository with correct values', async () => {
    const { sut, addStepCombiOvenTSIRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addStepCombiOvenTSIRepositoryStub, 'addStepCombiOvenTSI')
    const stepCombiOvenTSI = await mockAddStepCombiOvenTSI()
    await sut.addStepCombiOvenTSI(stepCombiOvenTSI)
    expect(addSpy).toHaveBeenCalledWith(stepCombiOvenTSI)
  })

  test('Should throw if AddStepCombiOvenTSIRepository throws', async () => {
    const { sut, addStepCombiOvenTSIRepositoryStub } = makeSut()
    jest.spyOn(addStepCombiOvenTSIRepositoryStub, 'addStepCombiOvenTSI').mockRejectedValue(new Error())
    const stepCombiOvenTSI = await mockAddStepCombiOvenTSI()
    const promise = sut.addStepCombiOvenTSI(stepCombiOvenTSI)
    await expect(promise).rejects.toThrow()
  })
})
