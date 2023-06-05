/* eslint-disable no-undef */
import { mockAddRecipeCmax, mockReturnRecipeCmax } from '../../../domain/mocks/menus'
import { DbAddRecipeCMAX } from './db-add-recipe-cmax'
import { AddRecipeCMAXModel, RecipeCMAXModel, AddRecipeCMAXRepository } from './db-add-recipe-cmax-protocols'

const makeAddRecipeCMAXRepository = (): AddRecipeCMAXRepository => {
  class AddRecipeCMAXRepositoryStub implements AddRecipeCMAXRepository {
    async addRecipeCMAX (recipeData: AddRecipeCMAXModel): Promise<RecipeCMAXModel> {
      return new Promise(resolve => resolve(mockReturnRecipeCmax()))
    }
  }
  return new AddRecipeCMAXRepositoryStub()
}

interface SutTypes {
  sut: DbAddRecipeCMAX
  addRecipeCMAXRepositoryStub: AddRecipeCMAXRepository
}

const makeSut = (): SutTypes => {
  const addRecipeCMAXRepositoryStub = makeAddRecipeCMAXRepository()
  const sut = new DbAddRecipeCMAX(addRecipeCMAXRepositoryStub)
  return {
    sut,
    addRecipeCMAXRepositoryStub
  }
}

describe('DbAddRecipeCMAX Usecase', () => {
  test('Should call AddRecipeCMAXRepository with correct values', async () => {
    const { sut, addRecipeCMAXRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRecipeCMAXRepositoryStub, 'addRecipeCMAX')
    const recipeResult = await mockAddRecipeCmax()
    await sut.addRecipeCMAX(recipeResult)
    expect(addSpy).toHaveBeenCalledWith(recipeResult)
  })

  test('Should throw if AddRecipeCMAXRepository thows', async () => {
    const { sut, addRecipeCMAXRepositoryStub } = makeSut()
    jest.spyOn(addRecipeCMAXRepositoryStub, 'addRecipeCMAX').mockRejectedValue(new Error())
    const recipeResult = await mockAddRecipeCmax()
    const promise = sut.addRecipeCMAX(recipeResult)
    await expect(promise).rejects.toThrow()
  })
})
