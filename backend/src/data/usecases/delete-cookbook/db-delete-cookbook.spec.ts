/* eslint-disable no-undef */
import { DbDeleteCookbook } from './db-delete-cookbook'
import { DeleteCookbookRepository } from '../../protocols/db/cookbook/delete-cookbook-repository'
import { mockInsertCookbook } from '../../../domain/mocks/cookbook'
import { DeleteStepSpeedOvenRepository } from '../../protocols/db/recipe/delete-step-SpeedOven-repository'
import { DeleteCombiOvenTSIRepository } from '../../protocols/db/recipe/delete-step-CombiOvenTSI-repository'
import { DeleteCombiOvenCMAXRepository } from '../../protocols/db/recipe/delete-step-CombiOvenCMAX-repository'

const makeDeleteCookbookRepository = (): DeleteCookbookRepository => {
  class DeleteCookbookRepositoryStub implements DeleteCookbookRepository {
    async deleteCookbook (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteCookbookRepositoryStub()
}

const makeDeleteStepSpeedOvenRepository = (): DeleteStepSpeedOvenRepository => {
  class DeleteStepSpeedOvenRepositoryStub implements DeleteStepSpeedOvenRepository {
    deleteSpeedOven (id: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteStepSpeedOvenRepositoryStub()
}

const makeDeleteCombiOvenTSIRepository = (): DeleteCombiOvenTSIRepository => {
  class DeleteCombiOvenTSIRepositoryStub implements DeleteCombiOvenTSIRepository {
    deleteCombiOvenTSI (id: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteCombiOvenTSIRepositoryStub()
}

const makeDeleteCombiOvenCMAXRepository = (): DeleteCombiOvenCMAXRepository => {
  class DeleteCombiOvenCMAXRepositoryStub implements DeleteCombiOvenCMAXRepository {
    deleteCombiOvenCMAX (id: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteCombiOvenCMAXRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteCookbook
  deleteCookbookRepositoryStub: DeleteCookbookRepository
  deleteStepSpeedOvenRepositoryStup: DeleteStepSpeedOvenRepository
  deleteCombiOvenTSIRepositoryStup: DeleteCombiOvenTSIRepository
  deleteCombiOvenCMAXRepositoryStup: DeleteCombiOvenCMAXRepository
}

const makeSut = (): SutTypes => {
  const deleteCookbookRepositoryStub = makeDeleteCookbookRepository()
  const deleteStepSpeedOvenRepositoryStup = makeDeleteStepSpeedOvenRepository()
  const deleteCombiOvenTSIRepositoryStup = makeDeleteCombiOvenTSIRepository()
  const deleteCombiOvenCMAXRepositoryStup = makeDeleteCombiOvenCMAXRepository()
  const sut = new DbDeleteCookbook(deleteCookbookRepositoryStub, deleteStepSpeedOvenRepositoryStup, deleteCombiOvenTSIRepositoryStup, deleteCombiOvenCMAXRepositoryStup)
  return {
    sut,
    deleteCookbookRepositoryStub,
    deleteStepSpeedOvenRepositoryStup,
    deleteCombiOvenTSIRepositoryStup,
    deleteCombiOvenCMAXRepositoryStup
  }
}

describe('DbDeleteCookbook Usecase', () => {
  test('Should call deleteCookbookRepository with correct values', async () => {
    const { sut, deleteCookbookRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteCookbookRepositoryStub, 'deleteCookbook')
    const cookbook = await mockInsertCookbook()
    await sut.deleteCookbook(cookbook.idCookbook, 1)
    expect(deleteSpy).toHaveBeenCalledWith(cookbook.idCookbook)
  })

  test('Should throw if deleteGroupRepository thows', async () => {
    const { sut, deleteCookbookRepositoryStub } = makeSut()
    jest.spyOn(deleteCookbookRepositoryStub, 'deleteCookbook').mockRejectedValue(new Error())
    const promise = sut.deleteCookbook(1, 1)
    await expect(promise).rejects.toThrow()
  })
})
