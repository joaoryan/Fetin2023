/* eslint-disable no-undef */
import { DbUpdateStepCombiOvenTSI } from './db-update-step-CombiOvenTSI'
import { StepCombiOvenTSIModel, UpdateStepCombiOvenTSIRepository } from './db-update-step-CombiOvenTSI-protocols'
import { mockUpdateStepCombiOvenTSI } from '../../../domain/mocks/menus'

const makeUpdateStepCombiOvenTSIRepository = (): UpdateStepCombiOvenTSIRepository => {
  class UpdateStepCombiOvenTSIRepositoryStub implements UpdateStepCombiOvenTSIRepository {
    async updateStepCombiOvenTSI (id: number, stepCombiOvenTSIData: StepCombiOvenTSIModel): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new UpdateStepCombiOvenTSIRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateStepCombiOvenTSI
  updateStepCombiOvenTSIRepositoryStub: UpdateStepCombiOvenTSIRepository
}

const makeSut = (): SutTypes => {
  const updateStepCombiOvenTSIRepositoryStub = makeUpdateStepCombiOvenTSIRepository()
  const sut = new DbUpdateStepCombiOvenTSI(updateStepCombiOvenTSIRepositoryStub)
  return {
    sut,
    updateStepCombiOvenTSIRepositoryStub
  }
}

describe('DbUpdateStepCombiOvenTSI Usecase', () => {
  test('Should call UpdateStepCombiOvenTSIRepository with correct values', async () => {
    const { sut, updateStepCombiOvenTSIRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateStepCombiOvenTSIRepositoryStub, 'updateStepCombiOvenTSI')
    const stepCombiOvenTSIResult = await mockUpdateStepCombiOvenTSI()
    await sut.updateStepCombiOvenTSI(stepCombiOvenTSIResult.id, stepCombiOvenTSIResult)
    expect(updateSpy).toHaveBeenCalledWith(stepCombiOvenTSIResult.id, stepCombiOvenTSIResult)
  })

  test('Should throw if UpdateStepCombiOvenTSIRepository throws', async () => {
    const { sut, updateStepCombiOvenTSIRepositoryStub } = makeSut()
    jest.spyOn(updateStepCombiOvenTSIRepositoryStub, 'updateStepCombiOvenTSI').mockRejectedValue(new Error())
    const stepCombiOvenTSIResult = await mockUpdateStepCombiOvenTSI()
    const promise = sut.updateStepCombiOvenTSI(stepCombiOvenTSIResult.id, stepCombiOvenTSIResult)
    await expect(promise).rejects.toThrow()
  })
})
