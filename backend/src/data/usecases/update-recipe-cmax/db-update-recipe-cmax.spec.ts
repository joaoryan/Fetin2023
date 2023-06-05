/* eslint-disable no-undef */
import { mockUpdateRecipeCmax, mockReturnRecipeCmax } from '../../../domain/mocks/menus'
import { DbUpdateRecipeCMAX } from './db-update-recipe-cmax'
import { RecipeCMAXModel, UpdateRecipeCmaxModel, UpdateRecipeCMAXRepository } from './db-update-recipe-cmax-protocols'

const makeUpdateRecipeCMAXRepository = (): UpdateRecipeCMAXRepository => {
  class UpdateRecipeCMAXRepositoryStub implements UpdateRecipeCMAXRepository {
    async updateRecipeCMAX (recipeData: UpdateRecipeCmaxModel): Promise<RecipeCMAXModel> {
      return new Promise(resolve => resolve(mockReturnRecipeCmax()))
    }
  }
  return new UpdateRecipeCMAXRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateRecipeCMAX
  UpdateRecipeCMAXRepositoryStub: UpdateRecipeCMAXRepository
}

const makeSut = (): SutTypes => {
  const UpdateRecipeCMAXRepositoryStub = makeUpdateRecipeCMAXRepository()
  const sut = new DbUpdateRecipeCMAX(UpdateRecipeCMAXRepositoryStub)
  return {
    sut,
    UpdateRecipeCMAXRepositoryStub
  }
}

describe('DbUpdateRecipeCMAX Usecase', () => {
  test('Should call UpdateRecipeCMAXRepositoryStub with correct values', async () => {
    const { sut, UpdateRecipeCMAXRepositoryStub } = makeSut()
    const UpdateSpy = jest.spyOn(UpdateRecipeCMAXRepositoryStub, 'updateRecipeCMAX')
    const recipeResult = await mockUpdateRecipeCmax()
    await sut.updateRecipeCMAX(recipeResult)
    expect(UpdateSpy).toHaveBeenCalledWith(recipeResult)
  })

  test('Should throw if UpdateRecipeCMAXRepositoryStub thows', async () => {
    const { sut, UpdateRecipeCMAXRepositoryStub } = makeSut()
    jest.spyOn(UpdateRecipeCMAXRepositoryStub, 'updateRecipeCMAX').mockRejectedValue(new Error())
    const recipeResult = await mockUpdateRecipeCmax()
    const promise = sut.updateRecipeCMAX(recipeResult)
    await expect(promise).rejects.toThrow()
  })
})
