/* eslint-disable no-undef */
import { DbUpdateStepCombiOvenCMAX } from './db-update-step-CombiOvenCMAX'
import { StepCombiOvenCMAXModel, UpdateStepCombiOvenCMAXRepository } from './db-update-step-CombiOvenCMAX-protocols'
import { mockUpdateStepCombiOvenCMAX } from '../../../domain/mocks/menus'

const makeUpdateStepCombiOvenCMAXRepository = (): UpdateStepCombiOvenCMAXRepository => {
  class UpdateStepCombiOvenCMAXRepositoryStub implements UpdateStepCombiOvenCMAXRepository {
    async updateStepCombiOvenCMAX (id: number, stepCombiOvenCMAXData: StepCombiOvenCMAXModel): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new UpdateStepCombiOvenCMAXRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateStepCombiOvenCMAX
  updateStepCombiOvenCMAXRepositoryStub: UpdateStepCombiOvenCMAXRepository
}

const makeSut = (): SutTypes => {
  const updateStepCombiOvenCMAXRepositoryStub = makeUpdateStepCombiOvenCMAXRepository()
  const sut = new DbUpdateStepCombiOvenCMAX(updateStepCombiOvenCMAXRepositoryStub)
  return {
    sut,
    updateStepCombiOvenCMAXRepositoryStub
  }
}

describe('DbUpdateStepCombiOvenCMAX Usecase', () => {
  test('Should call UpdateStepCombiOvenCMAXRepository with correct values', async () => {
    const { sut, updateStepCombiOvenCMAXRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateStepCombiOvenCMAXRepositoryStub, 'updateStepCombiOvenCMAX')
    const stepCombiOvenCMAXResult = await mockUpdateStepCombiOvenCMAX()
    await sut.updateStepCombiOvenCMAX(stepCombiOvenCMAXResult.id, stepCombiOvenCMAXResult)
    expect(updateSpy).toHaveBeenCalledWith(stepCombiOvenCMAXResult.id, stepCombiOvenCMAXResult)
  })

  test('Should throw if UpdateStepCombiOvenCMAXRepository throws', async () => {
    const { sut, updateStepCombiOvenCMAXRepositoryStub } = makeSut()
    jest.spyOn(updateStepCombiOvenCMAXRepositoryStub, 'updateStepCombiOvenCMAX').mockRejectedValue(new Error())
    const stepCombiOvenCMAXResult = await mockUpdateStepCombiOvenCMAX()
    const promise = sut.updateStepCombiOvenCMAX(stepCombiOvenCMAXResult.id, stepCombiOvenCMAXResult)
    await expect(promise).rejects.toThrow()
  })
})
