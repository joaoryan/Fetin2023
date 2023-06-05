/* eslint-disable no-undef */
import { DbDeleteStepCombiOvenCMAX } from './db-delete-step-CombiOvenCMAX'
import { DeleteStepCombiOvenCMAXRepository } from './db-delete-step-CombiOvenCMAX-protocols'
import { mockInsertStepCombiOvenCMAX } from '../../../domain/mocks/menus'

const makeDeleteStepCombiOvenCMAXRepository = (): DeleteStepCombiOvenCMAXRepository => {
  class DeleteStepCombiOvenCMAXRepositoryStub implements DeleteStepCombiOvenCMAXRepository {
    async deleteStepCombiOvenCMAX (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteStepCombiOvenCMAXRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteStepCombiOvenCMAX
  deleteStepCombiOvenCMAXRepositoryStub: DeleteStepCombiOvenCMAXRepository
}

const makeSut = (): SutTypes => {
  const deleteStepCombiOvenCMAXRepositoryStub = makeDeleteStepCombiOvenCMAXRepository()
  const sut = new DbDeleteStepCombiOvenCMAX(deleteStepCombiOvenCMAXRepositoryStub)
  return {
    sut,
    deleteStepCombiOvenCMAXRepositoryStub
  }
}

describe('DbDeleteStepCombiOvenCMAX Usecase', () => {
  test('Should call deleteStepCombiOvenCMAXRepository with correct values', async () => {
    const { sut, deleteStepCombiOvenCMAXRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteStepCombiOvenCMAXRepositoryStub, 'deleteStepCombiOvenCMAX')
    const stepCombiOvenCMAX = await mockInsertStepCombiOvenCMAX()
    await sut.deleteStepCombiOvenCMAX(stepCombiOvenCMAX.idStep)
    expect(deleteSpy).toHaveBeenCalledWith(stepCombiOvenCMAX.idStep)
  })

  test('Should throw if deleteStepCombiOvenCMAXRepository throws', async () => {
    const { sut, deleteStepCombiOvenCMAXRepositoryStub } = makeSut()
    jest.spyOn(deleteStepCombiOvenCMAXRepositoryStub, 'deleteStepCombiOvenCMAX').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.deleteStepCombiOvenCMAX(1)
    await expect(promise).rejects.toThrow()
  })
})
