/* eslint-disable no-undef */
import { DeleteCombiOvenCMAXRepository, DeleteCombiOvenTSIRepository, DeleteRecipeCMAXRepository, DeleteRecipeRepository, DeleteStepSpeedOvenRepository } from './db-delete-recipe-protocols'
import { DbDeleteRecipe } from './db-delete-recipe'

const makeDeleteRecipeCMAXRepository = (): DeleteRecipeCMAXRepository => {
  class DeleteRecipeCMAXRepositoryStub implements DeleteRecipeCMAXRepository {
    deleteRecipeCMAX (id: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteRecipeCMAXRepositoryStub()
}

const makeDeleteRecipeRepository = (): DeleteRecipeRepository => {
  class DeleteRecipeRepositoryStub implements DeleteRecipeRepository {
    deleteRecipe (id: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteRecipeRepositoryStub()
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
  sut: DbDeleteRecipe
  deleteRecipeRepositoryStub: DeleteRecipeRepository
  deleteRecipeCMAXRepositoryStub: DeleteRecipeCMAXRepository
  deleteStepSpeedOvenRepositoryStup: DeleteStepSpeedOvenRepository
  deleteCombiOvenTSIRepositoryStup: DeleteCombiOvenTSIRepository
  deleteCombiOvenCMAXRepositoryStup: DeleteCombiOvenCMAXRepository
}

const makeSut = (): SutTypes => {
  const deleteRecipeRepositoryStub = makeDeleteRecipeRepository()
  const deleteRecipeCMAXRepositoryStub = makeDeleteRecipeCMAXRepository()
  const deleteStepSpeedOvenRepositoryStup = makeDeleteStepSpeedOvenRepository()
  const deleteCombiOvenTSIRepositoryStup = makeDeleteCombiOvenTSIRepository()
  const deleteCombiOvenCMAXRepositoryStup = makeDeleteCombiOvenCMAXRepository()
  const sut = new DbDeleteRecipe(deleteRecipeRepositoryStub, deleteRecipeCMAXRepositoryStub, deleteStepSpeedOvenRepositoryStup, deleteCombiOvenTSIRepositoryStup, deleteCombiOvenCMAXRepositoryStup)
  return {
    sut,
    deleteRecipeRepositoryStub,
    deleteRecipeCMAXRepositoryStub,
    deleteStepSpeedOvenRepositoryStup,
    deleteCombiOvenTSIRepositoryStup,
    deleteCombiOvenCMAXRepositoryStup
  }
}

describe('DbDeleteGroup Usecase', () => {
  test('Should call DeleteRecipeRepository with correct values', async () => {
    const { sut, deleteRecipeRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteRecipeRepositoryStub, 'deleteRecipe')
    await sut.deleteRecipe(1, 3)
    expect(deleteSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if DeleteRecipeRepository thows', async () => {
    const { sut, deleteRecipeRepositoryStub } = makeSut()
    jest.spyOn(deleteRecipeRepositoryStub, 'deleteRecipe').mockRejectedValue(new Error())
    const promise = sut.deleteRecipe(1, 3)
    await expect(promise).rejects.toThrow()
  })

  test('Should call DeleteRecipeCMAXRepository with correct values', async () => {
    const { sut, deleteRecipeCMAXRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteRecipeCMAXRepositoryStub, 'deleteRecipeCMAX')
    await sut.deleteRecipe(1, 4)
    expect(deleteSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if DeleteRecipeCMAXRepository thows', async () => {
    const { sut, deleteRecipeCMAXRepositoryStub } = makeSut()
    jest.spyOn(deleteRecipeCMAXRepositoryStub, 'deleteRecipeCMAX').mockRejectedValue(new Error())
    const promise = sut.deleteRecipe(1, 4)
    await expect(promise).rejects.toThrow()
  })
})
