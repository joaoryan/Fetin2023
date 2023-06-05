/* eslint-disable no-undef */
import { DbDeleteStepSpeedOven } from './db-delete-step-SpeedOven'
import { DeleteStepSpeedOvenRepository } from './db-delete-step-SpeedOven-protocols'
import { mockInsertStepSpeedOven } from '../../../domain/mocks/menus'

const makeDeleteStepSpeedOvenRepository = (): DeleteStepSpeedOvenRepository => {
  class DeleteStepSpeedOvenRepositoryStub implements DeleteStepSpeedOvenRepository {
    async deleteStepSpeedOven (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteStepSpeedOvenRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteStepSpeedOven
  deleteStepSpeedOvenRepositoryStub: DeleteStepSpeedOvenRepository
}

const makeSut = (): SutTypes => {
  const deleteStepSpeedOvenRepositoryStub = makeDeleteStepSpeedOvenRepository()
  const sut = new DbDeleteStepSpeedOven(deleteStepSpeedOvenRepositoryStub)
  return {
    sut,
    deleteStepSpeedOvenRepositoryStub
  }
}

describe('DbDeleteStepSpeedOven Usecase', () => {
  test('Should call deleteStepSpeedOvenRepository with correct values', async () => {
    const { sut, deleteStepSpeedOvenRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteStepSpeedOvenRepositoryStub, 'deleteStepSpeedOven')
    const stepSpeedOven = await mockInsertStepSpeedOven()
    await sut.deleteStepSpeedOven(stepSpeedOven.idStepSpeedOven)
    expect(deleteSpy).toHaveBeenCalledWith(stepSpeedOven.idStepSpeedOven)
  })

  test('Should throw if deleteStepSpeedOvenRepository throws', async () => {
    const { sut, deleteStepSpeedOvenRepositoryStub } = makeSut()
    jest.spyOn(deleteStepSpeedOvenRepositoryStub, 'deleteStepSpeedOven').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.deleteStepSpeedOven(1)
    await expect(promise).rejects.toThrow()
  })
})
