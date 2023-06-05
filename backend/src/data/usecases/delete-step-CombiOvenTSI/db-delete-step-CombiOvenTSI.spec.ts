/* eslint-disable no-undef */
import { DbDeleteStepCombiOvenTSI } from './db-delete-step-CombiOvenTSI'
import { DeleteStepCombiOvenTSIRepository } from './db-delete-step-CombiOvenTSI-protocols'
import { mockInsertStepCombiOvenTSI } from '../../../domain/mocks/menus'

const makeDeleteStepCombiOvenTSIRepository = (): DeleteStepCombiOvenTSIRepository => {
  class DeleteStepCombiOvenTSIRepositoryStub implements DeleteStepCombiOvenTSIRepository {
    async deleteStepCombiOvenTSI (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteStepCombiOvenTSIRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteStepCombiOvenTSI
  deleteStepCombiOvenTSIRepositoryStub: DeleteStepCombiOvenTSIRepository
}

const makeSut = (): SutTypes => {
  const deleteStepCombiOvenTSIRepositoryStub = makeDeleteStepCombiOvenTSIRepository()
  const sut = new DbDeleteStepCombiOvenTSI(deleteStepCombiOvenTSIRepositoryStub)
  return {
    sut,
    deleteStepCombiOvenTSIRepositoryStub
  }
}

describe('DbDeleteStepCombiOvenTSI Usecase', () => {
  test('Should call deleteStepCombiOvenTSIRepository with correct values', async () => {
    const { sut, deleteStepCombiOvenTSIRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteStepCombiOvenTSIRepositoryStub, 'deleteStepCombiOvenTSI')
    const stepCombiOvenTSI = await mockInsertStepCombiOvenTSI()
    await sut.deleteStepCombiOvenTSI(stepCombiOvenTSI.idStep)
    expect(deleteSpy).toHaveBeenCalledWith(stepCombiOvenTSI.idStep)
  })

  test('Should throw if deleteStepCombiOvenTSIRepository throws', async () => {
    const { sut, deleteStepCombiOvenTSIRepositoryStub } = makeSut()
    jest.spyOn(deleteStepCombiOvenTSIRepositoryStub, 'deleteStepCombiOvenTSI').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.deleteStepCombiOvenTSI(1)
    await expect(promise).rejects.toThrow()
  })
})
